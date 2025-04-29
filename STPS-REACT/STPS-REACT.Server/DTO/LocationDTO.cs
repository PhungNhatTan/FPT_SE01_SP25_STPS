using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class LocationDTO
    {
        public required String LocationId { get; set; }
        public String? LocationName { get; set; }
        public String? TypeId { get; set; }
        public String? TypeName { get; set; }
        public double? Price { get; set; }
        public double? lat { get; set; }
        public double? lon { get; set; }
        public String? imgUrl {  get; set; }
        public String? regionId {  get; set; }
        public String? Address { get; set; }
        public double? Rating { get; set; }
        public double? Score { get; set; }
        public Region? Region { get; set; }
        public LocationType? Type { get; set; }
        public Feedback? Feedback { get; set; }
    }
}
