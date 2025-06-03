namespace BookTour.Utils
{
    public static class Fee
    {
        // Regular payment scenarios
        public static readonly decimal AdminFeePercent = 0.05m;
        public static readonly decimal CompanyRevenuePercent = 0.95m;
        public static readonly decimal AdminInitialPercent = 1.00m;
        
        // Refund scenario constants
        public static readonly decimal CustomerRefundPercent = 0.90m; // 90% back to customer
        public static readonly decimal CompanyCompensationPercent = 0.10m; // 10% to company (service fee)
        public static readonly decimal AdminRefundFeePercent = 0.00m; // 0% to admin on refunds
    }
}
