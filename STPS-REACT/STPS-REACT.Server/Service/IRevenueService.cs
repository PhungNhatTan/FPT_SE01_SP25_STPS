using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Service
{
    public interface IRevenueService
    {
        Task ProcessScheduledRevenueTransfers();
        Task<RevenueTransaction> CreateRevenueTransaction(Booking booking, string transactionType);
        Task<RevenueStatisticsResponse> GetCompanyRevenue(int companyId, DateTime? fromDate = null, DateTime? toDate = null);
        Task<AdminRevenueStatisticsResponse> GetAdminRevenueStatistics(DateTime? fromDate = null, DateTime? toDate = null);
        Task<List<RevenueTransaction>> GetPendingRevenueTransfers();
        Task<bool> ProcessRevenueTransfer(int revenueTransactionId);
    }
}
