using BookTour.Dto.Request;
using BookTour.Models;
using BookTour.Service;
using BookTour.Utils;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Service
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

            // Refund logic using Fee constants
            var refundAmount = booking.TotalAmount * Fee.CustomerRefundPercent;
            var companyCompensation = booking.TotalAmount * Fee.CompanyCompensationPercent;
            var adminFee = booking.TotalAmount * Fee.AdminRefundFeePercent;

            var refundRequest = new RefundRequest
            {
                BookingId = booking.BookingId,
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

                refundRequest.Status = "Completed";
                refundRequest.ProcessedDate = DateTime.Now;
                refundRequest.AdminNotes = "Hoàn trả đặt tour";
                _context.RefundRequests.Update(refundRequest);
                await _context.SaveChangesAsync();
                if(refundRequest.Booking != null)
                {
                    await CancelRevenueTransactionOfBooking(refundRequest.Booking);
                    await CreateRevenueTransactionForRefund(refundRequest.Booking);
                }
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

        private async Task CancelRevenueTransactionOfBooking(Booking booking)
        {
            var existingTransaction = await _context.RevenueTransactions
              .FirstOrDefaultAsync(rt => rt.BookingId == booking.BookingId && rt.TransactionType == "Revenue");

            if (existingTransaction == null)
                return;

            existingTransaction.Status = "Cancelled";
            existingTransaction.ProcessedDate = DateTime.Now;
            _context.RevenueTransactions.Update(existingTransaction);
            await _context.SaveChangesAsync();
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

        private async Task CreateRevenueTransactionForRefund(Booking booking)
        {
            var existingTransaction = await _context.RevenueTransactions
                .FirstOrDefaultAsync(rt => rt.BookingId == booking.BookingId && rt.TransactionType == "Refund");

            if (existingTransaction != null)
                return;
            decimal adminFee = booking.TotalAmount * Fee.AdminRefundFeePercent;
            decimal companyAmount = booking.TotalAmount * Fee.CompanyCompensationPercent;
            decimal customerRefund = booking.TotalAmount * Fee.CustomerRefundPercent;

            var revenueTransaction = new RevenueTransaction
            {
                BookingId = booking.BookingId,
                TourismCompanyId = booking.Tour.TourismCompanyId.Value,
                TotalAmount = booking.TotalAmount,
                AdminFee = adminFee,
                CompanyAmount = companyAmount,
                CustomerRefund = customerRefund,
                TransactionType = "Refund",
                Status = "Pending",
                ScheduledDate = DateTime.Now, // Process refund immediately
                Notes = $"Refund transaction for booking {booking.BookingId} - Customer: {customerRefund:C} VND, Company: {companyAmount:C} VND, Admin: {adminFee:C} VND"
            };

            _context.RevenueTransactions.Add(revenueTransaction);
            await _context.SaveChangesAsync();
        }
    }
}
