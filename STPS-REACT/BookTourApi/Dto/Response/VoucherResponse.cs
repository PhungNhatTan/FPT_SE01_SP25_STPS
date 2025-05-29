namespace BookTour.Dto.Response
{
    public class VoucherResponse
    {
        public int Id { get; set; }
        public string VoucherName { get; set; }
        public string VoucherDetail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
} 