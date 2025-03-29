using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class TcTourDTO
    {
        public String TourId { get; set; }
        public String TcId { get; set; }
        public double price { get; set; }
        public String TourName { get; set; }
        public String TcName { get; set; }
        public double avrRating { get; set; }
        public TourismCompany TourismCompany { get; set; }
        public Tour Tour { get; set; }
        public TourFeedback Feedback { get; set; }
    }
}
