namespace STPS_REACT.Server.DTO
{
    public class LocationTypeDTO
    {
        public LocationTypeDTO() { }
        public String locationTypeID { get; set; } = null!;
        public String? locationName { get; set; }

        public ICollection<LocationDTO>? locations { get; set; }
    }
}
