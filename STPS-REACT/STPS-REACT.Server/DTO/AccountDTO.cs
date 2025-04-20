using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class AccountDTO
    {
        public required String AccountId { get; set; }
        public String? Username { get; set; }
        public int? AuId { get; set; }
        public String? Password { get; set; }
        public bool? Status { get; set; }
        public ICollection<Authentication>? Authentications { get; set; }
        public ICollection<Blog>? Blogs { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<TourFeedback>? TourFeedbacks { get; set; }
        public ICollection<TourismCompany>? TourismCompanies { get; set; }
    }
}
