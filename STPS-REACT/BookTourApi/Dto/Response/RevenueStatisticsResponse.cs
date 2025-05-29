namespace BookTour.Dto.Response
{
    public class RevenueStatisticsResponse
    {
        public int TourismCompanyId { get; set; }
        public string CompanyName { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal PendingRevenue { get; set; }
        public decimal CompletedRevenue { get; set; }
        public int TotalBookings { get; set; }
        public int CompletedBookings { get; set; }
        public int CancelledBookings { get; set; }
        public List<MonthlyRevenueData> MonthlyData { get; set; }
        public List<RevenueTransactionSummary> RecentTransactions { get; set; }
    }

    public class MonthlyRevenueData
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal Revenue { get; set; }
        public int BookingCount { get; set; }
    }

    public class RevenueTransactionSummary
    {
        public int TransactionId { get; set; }
        public string TransactionType { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public string TourName { get; set; }
    }

    public class AdminRevenueStatisticsResponse
    {
        public decimal TotalAdminRevenue { get; set; }
        public decimal TotalCompanyRevenue { get; set; }
        public decimal TotalCustomerRefunds { get; set; }
        public decimal TotalSystemRevenue { get; set; }
        public int TotalBookings { get; set; }
        public int CompletedBookings { get; set; }
        public int CancelledBookings { get; set; }
        public int PendingBookings { get; set; }
        public List<MonthlyAdminRevenueData> MonthlyData { get; set; }
        public List<CompanyRevenueOverview> TopCompanies { get; set; }
        public List<RevenueTransactionSummary> RecentTransactions { get; set; }
    }

    public class MonthlyAdminRevenueData
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal AdminRevenue { get; set; }
        public decimal CompanyRevenue { get; set; }
        public decimal CustomerRefunds { get; set; }
        public int BookingCount { get; set; }
    }

    public class CompanyRevenueOverview
    {
        public int TourismCompanyId { get; set; }
        public string CompanyName { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal AdminFeeGenerated { get; set; }
        public int TotalBookings { get; set; }
    }
}
