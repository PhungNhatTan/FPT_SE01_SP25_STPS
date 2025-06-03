using BookTour.Dto.Response;
using BookTour.Models;

namespace BookTour.Service
{
    public interface IRevenueService
    {
        Task ProcessScheduledRevenueTransfers();
        Task<RevenueTransaction> CreateRevenueTransaction(Booking booking, string transactionType);
        Task<RevenueStatisticsResponse> GetCompanyRevenue(int companyId, DateTime? fromDate = null, DateTime? toDate = null);
        Task<AdminRevenueStatisticsResponse> GetAdminRevenueStatistics(DateTime? fromDate = null, DateTime? toDate = null);
        Task<List<RevenueTransaction>> GetPendingRevenueTransfers(int companyId);
        Task<bool> ProcessRevenueTransfer(int revenueTransactionId);
        Task<bool> CompleteCompanyRevenue(int companyId);
    }
}
