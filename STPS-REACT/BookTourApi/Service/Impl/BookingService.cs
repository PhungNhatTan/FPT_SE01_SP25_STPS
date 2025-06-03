using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Models;
using BookTour.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookTour.Service.Impl
{
    public class BookingService : IBookingService
    {
        private readonly BookTourContext _context;
        private readonly ILogger<BookingService> _logger;

        // Static readonly fields for business rule percentages
        private static readonly decimal RefundToCustomerPercent = 0.90m;
        private static readonly decimal CompanyCompensationPercent = 0.05m;
        private static readonly decimal AdminFeePercent = 0.05m;
        private static readonly decimal CompanyRevenuePercent = 0.95m;
        private static readonly decimal AdminRevenuePercent = 0.05m;

        public BookingService(BookTourContext context, ILogger<BookingService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Booking> GetBookingById(int id)
        {
            try
            {
                return await _context.Bookings
                    .Include(b => b.Tour).Include(b => b.BookingDetails)
                    .Include(b => b.RefundRequest)
                    .FirstOrDefaultAsync(b => b.BookingId == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting booking with ID {id}");
                throw;
            }
        }

        public async Task<Booking> CreateBooking(Booking booking)
        {
            try
            {
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                return booking;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating booking");
                throw;
            }
        }

        public async Task<Booking> UpdateBooking(Booking booking)
        {
            try
            {
                _context.Bookings.Update(booking);
                await _context.SaveChangesAsync();
                return booking;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating booking with ID {booking.BookingId}");
                throw;
            }
        }

        public async Task<bool> DeleteBooking(int id)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null)
                    return false;

                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting booking with ID {id}");
                throw;
            }
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            try
            {
                return await _context.Bookings
                    .Include(b => b.Tour)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all bookings");
                throw;
            }
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserId(int userId)
        {
            try
            {
                return await _context.Bookings
                    .Include(b => b.Tour)
                    .Where(b => b.UserId == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting bookings for user ID {userId}");
                throw;
            }
        }

        public async Task<ApiResponse<bool>> CancelBookingAsync(int bookingId, CreateRefundRequestDto createRefundRequestDto)
        {
            var booking = await _context.Bookings
                .Include(b => b.PaymentTransactions)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            if (booking == null)
                return ApiResponse<bool>.ErrorResponse("Booking not found");

            var tourDate = booking.TourDate;
            var today = DateTime.Now;
            var daysUntilTour = (tourDate - today).TotalDays;

            if (daysUntilTour <= 5)
                return ApiResponse<bool>.ErrorResponse("Cannot cancel booking. Tour starts in less than 5 days.");

            if (booking.Status == "Đã hủy" || booking.Status == "Yêu cầu hủy tour")
                return ApiResponse<bool>.ErrorResponse("Booking is already cancelled or has a pending cancellation request.");

            var payment = booking.PaymentTransactions.FirstOrDefault();
            if (payment == null || payment.Status != "Success")
                return ApiResponse<bool>.ErrorResponse("Cannot cancel booking. No successful payment found.");

            booking.Status = "Yêu cầu hủy tour";

            var refundRequest = new RefundRequest
            {
                BookingId = booking.BookingId,
                CustomerBankAccount = createRefundRequestDto.CustomerBankAccount,
                CustomerBankName = createRefundRequestDto.CustomerBankName,
                CustomerAccountHolderName = createRefundRequestDto.CustomerAccountHolderName,
                RefundAmount = booking.TotalAmount * RefundToCustomerPercent,
                CompanyCompensation = booking.TotalAmount * CompanyCompensationPercent,
                AdminFee = booking.TotalAmount * AdminFeePercent,
                Status = "Pending",
                RequestDate = DateTime.Now,
                Reason = "Yêu cầu hủy tour từ khách hàng",
                AdminNotes = null
            };
            _context.RefundRequests.Add(refundRequest);
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.SuccessResponse(true, "Cancellation request has been submitted successfully. Our staff will review your request.");
        }

        public async Task<string> CreateQrRefund(int refundRequestId)
        {
            // This should return a URL to redirect to
            return await GetQrRefundUrl(refundRequestId);
        }

        private async Task<string> GetQrRefundUrl(int refundRequestId)
        {
            // Implement the logic to get the redirect URL for the refund transaction
            // This is a placeholder and should be replaced with the actual implementation
            return "https://example.com/refund-qr-code";
        }
    }
} 