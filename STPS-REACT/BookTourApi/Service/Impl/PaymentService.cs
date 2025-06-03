using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Service;
using BookTour.Utils;
using Microsoft.EntityFrameworkCore;
using VNPAY.NET;
using VNPAY.NET.Enums;
using VNPAY.NET.Models;
using VNPAY.NET.Utilities;

namespace BookTour.Service.Impl
{
    public class PaymentService : IPaymentService
    {
        private readonly BookTourContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PaymentService> _logger;
        private readonly IVnpay _vnpay;

        public PaymentService(BookTourContext context, IConfiguration configuration, ILogger<PaymentService> logger, IVnpay vnpay)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            _vnpay = vnpay;

            // Validate VNPay configuration
            var tmnCode = _configuration["Vnpay:TmnCode"];
            var hashSecret = _configuration["Vnpay:HashSecret"];
            var baseUrl = _configuration["Vnpay:BaseUrl"];
            var callbackUrl = _configuration["Vnpay:CallbackUrl"];

            if (string.IsNullOrEmpty(tmnCode) || string.IsNullOrEmpty(hashSecret) || 
                string.IsNullOrEmpty(baseUrl) || string.IsNullOrEmpty(callbackUrl))
            {
                _logger.LogError("VNPay configuration is missing required fields");
                throw new InvalidOperationException("VNPay configuration is incomplete. Please check appsettings.json");
            }

            // Initialize VNPay
            _vnpay.Initialize(tmnCode, hashSecret, baseUrl, callbackUrl);
            _logger.LogInformation("VNPay service initialized successfully");
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
        private async Task CreateRevenueTransactionForBooking(Booking booking)
        {
            var existingTransaction = await _context.RevenueTransactions
                .FirstOrDefaultAsync(rt => rt.BookingId == booking.BookingId && rt.TransactionType == "Revenue");

            if (existingTransaction != null)
                return;

            decimal adminFee, companyAmount;

            if ((booking.TourDate - booking.BookingDate).TotalDays <= 5)
            {
                adminFee = booking.TotalAmount * Fee.AdminFeePercent;
                companyAmount = booking.TotalAmount * Fee.CompanyRevenuePercent;
            }
            else
            {
                adminFee = booking.TotalAmount * Fee.AdminInitialPercent; 
                companyAmount = 0m;
            }

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
        }

        public async Task<PaymentTransaction> GetPaymentTransaction(int bookingId)
        {
            return await _context.PaymentTransactions
                .FirstOrDefaultAsync(pt => pt.BookingId == bookingId);
        }

        public async Task<VNPayPaymentResponse> CreateVNPayPayment(int bookingId, double amount, string description, string ipAddress)
        {
            try
            {
                // Verify booking exists
                var booking = await _context.Bookings
                    .Include(b => b.Tour)
                    .FirstOrDefaultAsync(b => b.BookingId == bookingId);

                if (booking == null)
                    throw new ArgumentException("Booking not found");

                // Generate transaction ID
                var transactionId = $"TXN{DateTime.Now:yyyyMMddHHmmss}{bookingId:D6}";

                // Create payment transaction record
                var paymentTransaction = new PaymentTransaction
                {
                    BookingId = bookingId,
                    SimulatedTransactionId = transactionId,
                    Amount = (decimal)amount,
                    Status = "Pending",
                    PaymentDetails = description,
                    CreatedAt = DateTime.Now
                };

                _context.PaymentTransactions.Add(paymentTransaction);
                await _context.SaveChangesAsync();

                // Create VNPay payment request
                var request = new PaymentRequest
                {
                    PaymentId = paymentTransaction.TransactionId, 
                    Money = amount,
                    Description = description,
                    IpAddress = ipAddress,
                    BankCode = BankCode.ANY,
                    CreatedDate = DateTime.Now,
                    Currency = Currency.VND,
                    Language = DisplayLanguage.Vietnamese
                };

                var paymentUrl = _vnpay.GetPaymentUrl(request);

                return new VNPayPaymentResponse
                {
                    BookingId = bookingId,
                    Amount = amount,
                    PaymentUrl = paymentUrl,
                    TransactionId = transactionId,
                    Status = "Pending",
                    CreatedDate = DateTime.Now
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating VNPay payment for booking {bookingId}");
                throw;
            }
        }

        public async Task<(bool success, string redirectUrl)> HandleVNPayCallback(IQueryCollection query)
        {
            try
            {
                if (!query.Any())
                {
                    _logger.LogWarning("VNPay callback received without query parameters");
                    return (false, $"{_configuration["Frontend:Url"]}/booking-status?status=failed&error=invalid_callback");
                }

                var paymentResult = _vnpay.GetPaymentResult(query);
                _logger.LogInformation($"VNPay callback received: {System.Text.Json.JsonSerializer.Serialize(paymentResult)}");

                var transaction = await _context.PaymentTransactions
                    .FirstOrDefaultAsync(pt => pt.TransactionId == paymentResult.PaymentId);
                if (transaction == null)
                {
                    _logger.LogWarning($"No transaction found for VNPay transaction ID: {paymentResult.VnpayTransactionId}");
                    return (false, $"{_configuration["Frontend:Url"]}/booking-status?status=failed&error=transaction_not_found");
                }
                var booking = _context.Bookings.Find(transaction.BookingId);
                RefundRequest refundRequest = null;
                if (booking == null)
                {
                    _logger.LogWarning($"No transaction found for booking ID: {transaction.BookingId}");
                    return (false, $"{_configuration["Frontend:Url"]}/booking-status?status=failed&error=booking_not_found");
                }
                if (paymentResult.IsSuccess)
                {
                    transaction.Status = "Success";
                    transaction.UpdatedAt = DateTime.Now;
                    transaction.VnpayTransactionId = paymentResult.VnpayTransactionId.ToString();
                    _context.PaymentTransactions.Update(transaction);
                    if (booking != null)
                    {
                        booking.Status = "Đã xác nhận";
                        booking.PaymentStatus = "Đã thanh toán";
                        _context.Bookings.Update(booking);

                        try
                        {
                            var tour = await _context.Tours.FindAsync(booking.TourId);
                            if(tour != null)
                            {
                                booking.Tour = tour;
                                await CreateRevenueTransactionForBooking(booking);
                                _logger.LogInformation($"Created revenue transaction for booking {booking.BookingId}");
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, $"Failed to create revenue transaction for booking {booking.BookingId}");
                        }
                    }
                    else if (refundRequest != null)
                    {
                        transaction.BookingId = refundRequest.BookingId;
                        refundRequest.Status = "Completed";
                        refundRequest.ProcessedDate = DateTime.Now;
                        _context.RefundRequests.Update(refundRequest);
                    }
                    await _context.SaveChangesAsync();
                    return (true, $"{_configuration["Frontend:Url"]}/booking-status?bookingId={transaction.BookingId}&status=success");
                }
                else
                {
                    return (false, $"{_configuration["Frontend:Url"]}/booking-status?bookingId={transaction.BookingId}&status=failed&error={paymentResult.PaymentResponse.Description}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing VNPay callback");
                return (false, $"{_configuration["Frontend:Url"]}/booking-status?status=failed&error=system_error");
            }
        }
    }
}
