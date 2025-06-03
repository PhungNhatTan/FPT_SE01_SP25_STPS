namespace BookTour.Dto.Response
{
    public class VNPayPaymentResponse
    {
        public int? CompanyId { get; set; }
        public int? RefundId { get; set; }
        public int? BookingId { get; set; }
        public double Amount { get; set; }
        public string PaymentUrl { get; set; }
        public string TransactionId { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }
} 