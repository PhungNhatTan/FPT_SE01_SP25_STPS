namespace BookTour.Dto.Request
{
    public class CreateRefundRequestDto
    {
        public int? BookingId { get; set; }
        public string CustomerBankAccount { get; set; }
        public string CustomerBankName { get; set; }
        public string CustomerAccountHolderName { get; set; }
        public string? Reason { get; set; }
    }
}
