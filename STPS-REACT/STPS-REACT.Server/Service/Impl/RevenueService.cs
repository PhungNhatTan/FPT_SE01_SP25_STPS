using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Service;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Service
{
    public class RevenueService : IRevenueService
    {
        private readonly BookTourContext _context;
        private readonly ILogger<RevenueService> _logger;

        public RevenueService(BookTourContext context, ILogger<RevenueService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task ProcessScheduledRevenueTransfers()
        {
            try
            {
                // Lấy tất cả booking đã hết hạn hủy và chưa chuyển tiền
                var bookingsToTransfer = await _context.Bookings
                    .Include(b => b.Tour)
                    .ThenInclude(t => t.TourismCompany)
                    .Where(b => DateTime.Now >= b.RevenueTransferDate
                             && b.PaymentStatus == "Đã thanh toán"
                             && b.Status != "Đã hủy"
                             && !b.RevenueTransactions.Any(rt => rt.TransactionType == "Revenue" && rt.Status == "Completed"))
                    .ToListAsync();

                _logger.LogInformation($"Found {bookingsToTransfer.Count} bookings ready for revenue transfer");

                foreach (var booking in bookingsToTransfer)
                {
                    await CreateRevenueTransaction(booking, "Revenue");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing scheduled revenue transfers");
            }
        }

        public async Task<RevenueTransaction> CreateRevenueTransaction(Booking booking, string transactionType)
        {
            decimal adminFee, companyAmount, customerRefund = 0;

            if (transactionType == "Revenue")
            {
                // Normal revenue transfer: 95% to company, 5% admin fee
                adminFee = booking.TotalAmount * 0.05m;
                companyAmount = booking.TotalAmount * 0.95m;
            }
            else if (transactionType == "Refund")
            {
                // Refund: 90% to customer, 5% to company, 5% admin fee
                adminFee = booking.TotalAmount * 0.05m;
                companyAmount = booking.TotalAmount * 0.05m;
                customerRefund = booking.TotalAmount * 0.90m;
            }
            else
            {
                throw new ArgumentException("Invalid transaction type");
            }

            var revenueTransaction = new RevenueTransaction
            {
                BookingId = booking.BookingId,
                TourismCompanyId = booking.Tour.TourismCompanyId.Value,
                TotalAmount = booking.TotalAmount,
                AdminFee = adminFee,
                CompanyAmount = companyAmount,
                CustomerRefund = customerRefund,
                TransactionType = transactionType,
                Status = "Pending",
                ScheduledDate = transactionType == "Revenue" ? booking.RevenueTransferDate : DateTime.Now,
                Notes = $"{transactionType} transaction for booking {booking.BookingId}"
            };

            _context.RevenueTransactions.Add(revenueTransaction);
            await _context.SaveChangesAsync();

            await ProcessRevenueTransfer(revenueTransaction.RevenueTransactionId);

            return revenueTransaction;
        }

        public async Task<bool> ProcessRevenueTransfer(int revenueTransactionId)
        {
            var transaction = await _context.RevenueTransactions
                .Include(rt => rt.TourismCompany)
                .Include(rt => rt.Booking)
                .FirstOrDefaultAsync(rt => rt.RevenueTransactionId == revenueTransactionId);

            if (transaction == null)
                return false;

            try
            {
                _logger.LogInformation($"Simulating transfer of {transaction.CompanyAmount:C} to company {transaction.TourismCompany.CompanyName}");

                if (transaction.CustomerRefund.HasValue && transaction.CustomerRefund > 0)
                {
                    _logger.LogInformation($"Simulating refund of {transaction.CustomerRefund:C} to customer");
                }

                transaction.Status = "Completed";
                transaction.ProcessedDate = DateTime.Now;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing revenue transfer {revenueTransactionId}");
                transaction.Status = "Failed";
                await _context.SaveChangesAsync();
                return false;
            }
        }

        public async Task<List<RevenueTransaction>> GetPendingRevenueTransfers()
        {
            return await _context.RevenueTransactions
                .Include(rt => rt.TourismCompany)
                .Include(rt => rt.Booking)
                .ThenInclude(b => b.Tour)
                .Where(rt => rt.Status == "Pending")
                .OrderBy(rt => rt.ScheduledDate)
                .ToListAsync();
        }

        public async Task<RevenueStatisticsResponse> GetCompanyRevenue(int companyId, DateTime? fromDate = null, DateTime? toDate = null)
        {
            fromDate ??= DateTime.Now.AddMonths(-12);
            toDate ??= DateTime.Now;

            var company = await _context.TourismCompanies.FindAsync(companyId);
            if (company == null)
                throw new ArgumentException("Company not found");

            var revenueTransactions = await _context.RevenueTransactions
                .Include(rt => rt.Booking)
                .ThenInclude(b => b.Tour)
                .Where(rt => rt.TourismCompanyId == companyId
                          && rt.ScheduledDate >= fromDate
                          && rt.ScheduledDate <= toDate)
                .ToListAsync();

            var bookings = await _context.Bookings
                .Include(b => b.Tour)
                .Where(b => b.Tour.TourismCompanyId == companyId
                         && b.BookingDate >= fromDate
                         && b.BookingDate <= toDate)
                .ToListAsync();

            var totalRevenue = revenueTransactions.Where(rt => rt.Status == "Completed").Sum(rt => rt.CompanyAmount);
            var pendingRevenue = revenueTransactions.Where(rt => rt.Status == "Pending").Sum(rt => rt.CompanyAmount);

            return new RevenueStatisticsResponse
            {
                TourismCompanyId = companyId,
                CompanyName = company.CompanyName,
                TotalRevenue = totalRevenue,
                PendingRevenue = pendingRevenue,
                CompletedRevenue = totalRevenue,
                TotalBookings = bookings.Count,
                CompletedBookings = bookings.Count(b => b.Status == "Đã hoàn thành"),
                CancelledBookings = bookings.Count(b => b.Status == "Đã hủy"),
                MonthlyData = GetMonthlyRevenueData(revenueTransactions),
                RecentTransactions = GetRecentTransactions(revenueTransactions)
            };
        }

        private List<MonthlyRevenueData> GetMonthlyRevenueData(List<RevenueTransaction> transactions)
        {
            return transactions
                .Where(rt => rt.Status == "Completed")
                .GroupBy(rt => new { rt.ProcessedDate.Value.Year, rt.ProcessedDate.Value.Month })
                .Select(g => new MonthlyRevenueData
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Revenue = g.Sum(rt => rt.CompanyAmount),
                    BookingCount = g.Count()
                })
                .OrderBy(m => m.Year)
                .ThenBy(m => m.Month)
                .ToList();
        }

        private List<RevenueTransactionSummary> GetRecentTransactions(List<RevenueTransaction> transactions)
        {
            return transactions
                .OrderByDescending(rt => rt.ScheduledDate)
                .Take(10)
                .Select(rt => new RevenueTransactionSummary
                {
                    TransactionId = rt.RevenueTransactionId,
                    TransactionType = rt.TransactionType,
                    Amount = rt.CompanyAmount,
                    Status = rt.Status,
                    Date = rt.ProcessedDate ?? rt.ScheduledDate,
                    TourName = rt.Booking.Tour.TourName
                })
                .ToList();
        }

        public async Task<AdminRevenueStatisticsResponse> GetAdminRevenueStatistics(DateTime? fromDate = null, DateTime? toDate = null)
        {
            fromDate ??= DateTime.Now.AddMonths(-12);
            toDate ??= DateTime.Now;

            // Lấy tất cả revenue transactions trong khoảng thời gian
            var revenueTransactions = await _context.RevenueTransactions
                .Include(rt => rt.Booking)
                .ThenInclude(b => b.Tour)
                .ThenInclude(t => t.TourismCompany)
                .Where(rt => rt.ScheduledDate >= fromDate && rt.ScheduledDate <= toDate)
                .ToListAsync();

            // Lấy tất cả bookings trong khoảng thời gian
            var bookings = await _context.Bookings
                .Include(b => b.Tour)
                .ThenInclude(t => t.TourismCompany)
                .Where(b => b.BookingDate >= fromDate && b.BookingDate <= toDate)
                .ToListAsync();

            // Tính toán thống kê tổng quan
            var completedTransactions = revenueTransactions.Where(rt => rt.Status == "Completed").ToList();
            var totalAdminRevenue = completedTransactions.Sum(rt => rt.AdminFee);
            var totalCompanyRevenue = completedTransactions.Sum(rt => rt.CompanyAmount);
            var totalCustomerRefunds = completedTransactions.Where(rt => rt.CustomerRefund.HasValue).Sum(rt => rt.CustomerRefund.Value);
            var totalSystemRevenue = totalAdminRevenue + totalCompanyRevenue + totalCustomerRefunds;

            // Thống kê bookings
            var totalBookings = bookings.Count;
            var completedBookings = bookings.Count(b => b.Status == "Đã hoàn thành");
            var cancelledBookings = bookings.Count(b => b.Status == "Đã hủy");
            var pendingBookings = bookings.Count(b => b.Status == "Đã xác nhận" || b.Status == "Chờ xác nhận");

            // Dữ liệu theo tháng
            var monthlyData = GetMonthlyAdminRevenueData(completedTransactions);

            // Top companies
            var topCompanies = GetTopCompanies(completedTransactions);

            // Recent transactions
            var recentTransactions = GetRecentAdminTransactions(revenueTransactions);

            return new AdminRevenueStatisticsResponse
            {
                TotalAdminRevenue = totalAdminRevenue,
                TotalCompanyRevenue = totalCompanyRevenue,
                TotalCustomerRefunds = totalCustomerRefunds,
                TotalSystemRevenue = totalSystemRevenue,
                TotalBookings = totalBookings,
                CompletedBookings = completedBookings,
                CancelledBookings = cancelledBookings,
                PendingBookings = pendingBookings,
                MonthlyData = monthlyData,
                TopCompanies = topCompanies,
                RecentTransactions = recentTransactions
            };
        }

        private List<MonthlyAdminRevenueData> GetMonthlyAdminRevenueData(List<RevenueTransaction> transactions)
        {
            return transactions
                .GroupBy(rt => new { rt.ProcessedDate.Value.Year, rt.ProcessedDate.Value.Month })
                .Select(g => new MonthlyAdminRevenueData
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    AdminRevenue = g.Sum(rt => rt.AdminFee),
                    CompanyRevenue = g.Sum(rt => rt.CompanyAmount),
                    CustomerRefunds = g.Where(rt => rt.CustomerRefund.HasValue).Sum(rt => rt.CustomerRefund.Value),
                    BookingCount = g.Count()
                })
                .OrderBy(m => m.Year)
                .ThenBy(m => m.Month)
                .ToList();
        }

        private List<CompanyRevenueOverview> GetTopCompanies(List<RevenueTransaction> transactions)
        {
            return transactions
                .GroupBy(rt => new { rt.TourismCompanyId, rt.Booking.Tour.TourismCompany.CompanyName })
                .Select(g => new CompanyRevenueOverview
                {
                    TourismCompanyId = g.Key.TourismCompanyId,
                    CompanyName = g.Key.CompanyName,
                    TotalRevenue = g.Sum(rt => rt.CompanyAmount),
                    AdminFeeGenerated = g.Sum(rt => rt.AdminFee),
                    TotalBookings = g.Count()
                })
                .OrderByDescending(c => c.AdminFeeGenerated)
                .Take(10)
                .ToList();
        }

        private List<RevenueTransactionSummary> GetRecentAdminTransactions(List<RevenueTransaction> transactions)
        {
            return transactions
                .OrderByDescending(rt => rt.ScheduledDate)
                .Take(15)
                .Select(rt => new RevenueTransactionSummary
                {
                    TransactionId = rt.RevenueTransactionId,
                    TransactionType = rt.TransactionType,
                    Amount = rt.AdminFee, // Admin quan tâm đến phí admin
                    Status = rt.Status,
                    Date = rt.ProcessedDate ?? rt.ScheduledDate,
                    TourName = rt.Booking.Tour.TourName
                })
                .ToList();
        }
    }
}
