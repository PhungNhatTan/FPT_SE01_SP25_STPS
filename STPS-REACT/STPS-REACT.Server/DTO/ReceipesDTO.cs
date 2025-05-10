using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class ReceiptsDTO{
        public ReceiptsDTO(){}
        public required String AccountId { get; set; }
        public String? TourId{ get; set; }
        public String? LocationId { get; set; }
        public double? Amount { get; set; }
        public DateOnly? Date { get; set; }
        public ICollection<Account>? Accounts { get; set; }
        public ICollection<Location>? Locations { get; set; }
        public ICollection<Tour>? Tours { get; set; }
    }
}