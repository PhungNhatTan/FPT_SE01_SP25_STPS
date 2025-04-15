using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class LocationDTO
    {
        public String LocationId { get; set; }
        public String LocationName { get; set; }
        public String TypeId { get; set; }
        public String TypeName { get; set; }
        public double? Price { get; set; }
        protected LocationType Type { get; set; }
    }
}
