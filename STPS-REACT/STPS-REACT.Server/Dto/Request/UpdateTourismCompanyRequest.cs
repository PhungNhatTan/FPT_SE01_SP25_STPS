namespace STPS_REACT.Server.Dto.Request
{
    public class UpdateTourismCompanyRequest
    {
        public int Id { get; set; }
        public string RepresentativeName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxCode { get; set; }
    }
}