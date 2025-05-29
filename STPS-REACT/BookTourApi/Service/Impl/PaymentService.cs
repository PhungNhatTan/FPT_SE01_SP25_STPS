using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Service;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Service.Impl
{
    public class PaymentService : IPaymentService
    {
        private readonly BookTourContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PaymentService> _logger;

        public PaymentService(BookTourContext context, IConfiguration configuration, ILogger<PaymentService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<PaymentQRResponse> CreatePaymentQR(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.Tour)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            if (booking == null)
                throw new ArgumentException("Booking not found");

            var transactionId = $"TXN{DateTime.Now:yyyyMMddHHmmss}{bookingId:D6}";

            var paymentTransaction = new PaymentTransaction
            {
                BookingId = bookingId,
                SimulatedTransactionId = transactionId,
                Amount = booking.TotalAmount,
                Status = "Pending",
                PaymentDetails = $"Payment for tour {booking.Tour.TourName}"
            };

            _context.PaymentTransactions.Add(paymentTransaction);
            await _context.SaveChangesAsync();

            var adminBankAccount = new AdminBankAccountInfo
            {
                BankName = _configuration["AdminBankAccount:BankName"] ?? "Vietcombank",
                AccountNumber = _configuration["AdminBankAccount:AccountNumber"] ?? "0123456789",
                AccountHolderName = _configuration["AdminBankAccount:AccountHolderName"] ?? "ADMIN GOTOUR",
                PaymentContent = $"Thanh toan tour {booking.Tour.TourName} - {booking.BookingId}"
            };
            var qrContent = $"Bank: {adminBankAccount.BankName}\n" +
                           $"Account: {adminBankAccount.AccountNumber}\n" +
                           $"Name: {adminBankAccount.AccountHolderName}\n" +
                           $"Amount: {booking.TotalAmount:N0} VND\n" +
                           $"Content: {adminBankAccount.PaymentContent}";

            return new PaymentQRResponse
            {
                BookingId = bookingId,
                Amount = booking.TotalAmount,
                QRContent = qrContent,
                AdminBankAccount = adminBankAccount,
                TransactionId = transactionId
            };
        }

        public async Task<bool> ConfirmPayment(int bookingId, string transactionId)
        {
            var booking = await _context.Bookings
                .Include(b => b.Tour)
                .ThenInclude(t => t.TourismCompany)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            var paymentTransaction = await _context.PaymentTransactions
                .FirstOrDefaultAsync(pt => pt.BookingId == bookingId && pt.SimulatedTransactionId == transactionId);

            if (booking == null || paymentTransaction == null)
                return false;

            paymentTransaction.Status = "Success";

            booking.PaymentStatus = "Đã thanh toán";
            booking.Status = "Đã xác nhận";

            await _context.SaveChangesAsync();
            try
            {
                await CreateRevenueTransactionForBooking(booking);
                _logger.LogInformation($"Created revenue transaction for booking {bookingId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to create revenue transaction for booking {bookingId}");
            }

            return true;
        }

        private async Task CreateRevenueTransactionForBooking(Booking booking)
        {
            var existingTransaction = await _context.RevenueTransactions
                .FirstOrDefaultAsync(rt => rt.BookingId == booking.BookingId && rt.TransactionType == "Revenue");

            if (existingTransaction != null)
                return;

            decimal adminFee = booking.TotalAmount * 0.05m;
            decimal companyAmount = booking.TotalAmount * 0.95m;

            var revenueTransaction = new RevenueTransaction
            {
                BookingId = booking.BookingId,
                TourismCompanyId = booking.Tour.TourismCompanyId.Value,
                TotalAmount = booking.TotalAmount,
                AdminFee = adminFee,
                CompanyAmount = companyAmount,
                CustomerRefund = null,
                TransactionType = "Revenue",
                Status = "Pending",
                ScheduledDate = booking.RevenueTransferDate,
                Notes = $"Revenue transaction for booking {booking.BookingId}"
            };

            _context.RevenueTransactions.Add(revenueTransaction);
            await _context.SaveChangesAsync();

            // Nếu RevenueTransferDate <= hiện tại, xử lý ngay
            if (booking.ShouldTransferRevenue)
            {
                revenueTransaction.Status = "Completed";
                revenueTransaction.ProcessedDate = DateTime.Now;
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Immediately processed revenue transfer for booking {booking.BookingId} - Amount: {companyAmount:C}");
            }
        }

        public async Task<PaymentTransaction> GetPaymentTransaction(int bookingId)
        {
            return await _context.PaymentTransactions
                .FirstOrDefaultAsync(pt => pt.BookingId == bookingId);
        }
    }
}
