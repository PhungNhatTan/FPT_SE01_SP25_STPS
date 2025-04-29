using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class TcTourDTO
    {
        public required String TourId { get; set; }
        public String? TcId { get; set; }
        public double? price { get; set; }
        public String? TourName { get; set; }
        public String? TcName { get; set; }
        public double? AvrRating { get; set; }
        public ICollection<TourismCompany>? TourismCompany { get; set; }
        public ICollection<Tour>? Tour { get; set; }
        public ICollection<TourFeedback>? Feedback { get; set; }
    }
}
