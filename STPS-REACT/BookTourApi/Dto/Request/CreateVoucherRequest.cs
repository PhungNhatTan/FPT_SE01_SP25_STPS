namespace BookTour.Dto.Request
{
    public class CreateVoucherRequest
    {
        public string VoucherName { get; set; }
        public string VoucherDetail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class UpdateVoucherRequest
    {
        public int Id { get; set; }
        public string VoucherName { get; set; }
        public string VoucherDetail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
} 