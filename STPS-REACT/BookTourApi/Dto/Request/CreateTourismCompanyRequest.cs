namespace BookTour.Dto.Request
{
    public class CreateTourismCompanyRequest
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string RepresentativeName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxCode { get; set; }
        public int UserId { get; set; } // Add UserId
    }
}