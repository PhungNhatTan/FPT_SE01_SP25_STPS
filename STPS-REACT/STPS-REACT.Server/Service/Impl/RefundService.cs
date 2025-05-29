using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Service;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Service
{
    public class RefundService : IRefundService
    {
        private readonly BookTourContext _context;
        private readonly IRevenueService _revenueService;
        private readonly ILogger<RefundService> _logger;

        public RefundService(BookTourContext context, IRevenueService revenueService, ILogger<RefundService> logger)
        {
            _context = context;
            _revenueService = revenueService;
            _logger = logger;
        }

        public async Task<bool> CanCancelBooking(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            return booking?.CanCancel ?? false;
        }

        public async Task<RefundRequest> CreateRefundRequest(CreateRefundRequestDto request)
        {
            var booking = await _context.Bookings
                .Include(b => b.Tour)
                .FirstOrDefaultAsync(b => b.BookingId == request.BookingId);

            if (booking == null)
                throw new ArgumentException("Booking not found");

            if (!booking.CanCancel)
                throw new InvalidOperationException("Booking cannot be cancelled");

            // Check if refund request already exists
            var existingRefund = await _context.RefundRequests
                .FirstOrDefaultAsync(rr => rr.BookingId == request.BookingId);

            if (existingRefund != null)
                throw new InvalidOperationException("Refund request already exists");

            // Calculate refund amounts
            var refundAmount = booking.TotalAmount * 0.90m; // 90% to customer
            var companyCompensation = booking.TotalAmount * 0.05m; // 5% to company
            var adminFee = booking.TotalAmount * 0.05m; // 5% admin fee

            var refundRequest = new RefundRequest
            {
                BookingId = request.BookingId,
                CustomerBankAccount = request.CustomerBankAccount,
                CustomerBankName = request.CustomerBankName,
                CustomerAccountHolderName = request.CustomerAccountHolderName,
                RefundAmount = refundAmount,
                CompanyCompensation = companyCompensation,
                AdminFee = adminFee,
                Reason = request.Reason ?? "Khách hàng yêu cầu hủy tour",
                Status = "Pending",
                AdminNotes = "Yêu cầu hủy tour đã được tạo tự động"
            };

            _context.RefundRequests.Add(refundRequest);

            // Update booking status
            booking.Status = "Đã hủy";

            await _context.SaveChangesAsync();

            await ProcessRefund(refundRequest.RefundRequestId);

            return refundRequest;
        }

        public async Task<bool> ProcessRefund(int refundRequestId)
        {
            var refundRequest = await _context.RefundRequests
                .Include(rr => rr.Booking)
                .ThenInclude(b => b.Tour)
                .FirstOrDefaultAsync(rr => rr.RefundRequestId == refundRequestId);

            if (refundRequest == null)
                return false;

            try
            {
                await _revenueService.CreateRevenueTransaction(refundRequest.Booking, "Refund");

                refundRequest.Status = "Completed";
                refundRequest.ProcessedDate = DateTime.Now;
                refundRequest.AdminNotes = "Refund processed automatically";

                await _context.SaveChangesAsync();

                _logger.LogInformation($"Refund processed for booking {refundRequest.BookingId}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing refund {refundRequestId}");
                refundRequest.Status = "Failed";
                await _context.SaveChangesAsync();
                return false;
            }
        }

        public async Task<RefundRequest> GetRefundRequest(int bookingId)
        {
            return await _context.RefundRequests
                .Include(rr => rr.Booking)
                .FirstOrDefaultAsync(rr => rr.BookingId == bookingId);
        }

        public async Task<List<RefundRequest>> GetPendingRefunds()
        {
            return await _context.RefundRequests
                .Include(rr => rr.Booking)
                .ThenInclude(b => b.Tour)
                .Where(rr => rr.Status == "Pending")
                .OrderBy(rr => rr.RequestDate)
                .ToListAsync();
        }
    }
}
