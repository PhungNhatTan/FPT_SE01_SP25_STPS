using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class PersonalizedTourDTO{
        public PersonalizedTourDTO(){}
        public required string tourId { get; set; }
        public required string AccountId { get; set; }
        public String? tourName { get; set;}
        public virtual ICollection<Account>? Account { get; set; }
        public virtual ICollection<Tour>? Tour { get; set; }
    }
}