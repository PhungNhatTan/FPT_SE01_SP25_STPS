using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using BookTour.Service;
using BookTour.Dto.Response;
using Microsoft.EntityFrameworkCore;
using BookTour.Dto.Request;
using BookTour.Models;
using System.Linq;
using VNPAY.NET.Utilities;
using Azure;
using BookTour.Dto.Common;
using BookTourApi.Dto.Response;

namespace BookTourApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IPaymentService _paymentService;
        private readonly ILogger<BookingController> _logger;
        private readonly BookTourContext _context;

        public BookingController(
            IBookingService bookingService, 
            IPaymentService paymentService, 
            ILogger<BookingController> logger, 
            BookTourContext context)
        {
            _bookingService = bookingService;
            _paymentService = paymentService;
            _logger = logger;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDetailResponse>> GetBookingDetails(int id)
        {
            try
            {
                var booking = await _bookingService.GetBookingById(id);
                if (booking == null)
                {
                    return NotFound("Booking not found");
                }
                int dataId = id;
                if(booking.RefundRequest != null && booking.RefundRequest.Status == "Completed")
                {
                    dataId = booking.RefundRequest.RefundRequestId;
                }
                var paymentTransaction = await _paymentService.GetPaymentTransaction(dataId);
                
                var response = new BookingDetailResponse
                {
                    BookingId = booking.BookingId,
                    TourName = booking.Tour.TourName,
                    TotalAmount = booking.TotalAmount,
                    PaymentStatus = booking.PaymentStatus,
                    PaymentTime = paymentTransaction?.UpdatedAt,
                    NumberOfGuests = booking.AdultCount + booking.ChildCount,
                    TourDate = booking.TourDate,
                    Status = booking.Status,
                    PassengerName = booking.BookingDetails?.FirstOrDefault()?.PassengerName ?? "N/A",
                    CreatedAt = booking.BookingDate,
                    isRefund = booking.RefundRequest != null,
                    Refund = booking.RefundRequest != null
                        ? new BookingDetailResponse.RefundHolder
                        {
                            RefundRequestId = booking.RefundRequest.RefundRequestId,
                            RefundAmount = booking.RefundRequest.RefundAmount,
                            RefundStatus = booking.RefundRequest.Status,
                            RefundRequestDate = booking.RefundRequest.RequestDate,
                            RefundProcessedDate = booking.RefundRequest.ProcessedDate,
                            RefundReason = booking.RefundRequest.Reason,
                            RefundAdminNotes = booking.RefundRequest.AdminNotes,
                            RefundBankAccount = booking.RefundRequest.CustomerBankAccount,
                            RefundBankName = booking.RefundRequest.CustomerBankName,
                            RefundAccountHolderName = booking.RefundRequest.CustomerAccountHolderName
                        }
                        : null
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting booking details for ID {id}");
                return StatusCode(500, "An error occurred while retrieving booking details");
            }
        }

        [HttpPost("cancel/{bookingId}")]
        public async Task<IActionResult> CancelBooking(int bookingId, CreateRefundRequestDto createRefundRequestDto)
        {
            var result = await _bookingService.CancelBookingAsync(bookingId, createRefundRequestDto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(new { message = result.Message });
        }

        [HttpGet("company-bookings/{companyId}")]
        public async Task<IActionResult> GetCompanyBookings(int companyId)
        {
            var company = await _context.TourismCompanies.FirstOrDefaultAsync(tc => tc.UserId == companyId);
            if (company == null)
                return NotFound("No company found for this ID.");

            var bookings = await _context.Bookings
                .Include(b => b.Tour)
                .Include(b => b.User)
                .Include(b => b.PaymentTransactions)
                .Include(b => b.RefundRequest)
                .Where(b => b.Tour.TourismCompanyId == company.Id)
                .Select(b => new CompanyBookingResponse
                {
                    BookingId = b.BookingId,
                    BookingDate = b.BookingDate,
                    TourDate = b.TourDate,
                    AdultCount = b.AdultCount,
                    ChildCount = b.ChildCount,
                    TotalAmount = b.TotalAmount,
                    Status = b.Status,
                    PaymentStatus = b.PaymentStatus,
                    PaymentMethod = b.PaymentMethod,
                    Customer = new CustomerInfo
                    {
                        FullName = b.User.FullName,
                        Email = b.User.Email,
                        Phone = b.User.Phone
                    },
                    Tour = new TourInfo
                    {
                        TourId = b.Tour.TourId,
                        TourName = b.Tour.TourName
                    },
                    Payments = b.PaymentTransactions.Select(pt => new PaymentInfo
                    {
                        TransactionId = pt.TransactionId,
                        Amount = pt.Amount,
                        Status = pt.Status,
                        CreatedAt = pt.CreatedAt,
                        UpdatedAt = pt.UpdatedAt
                    }).ToList(),
                    Refund = b.RefundRequest != null ? new RefundInfo
                    {
                        RefundRequestId = b.RefundRequest.RefundRequestId,
                        RefundAmount = b.RefundRequest.RefundAmount,
                        Status = b.RefundRequest.Status,
                        RequestDate = b.RefundRequest.RequestDate
                    } : null
                })
                .ToListAsync();

            return Ok(ApiResponse<List<CompanyBookingResponse>>.SuccessResponse(bookings));
        }
    }
} 