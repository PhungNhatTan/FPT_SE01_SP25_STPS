using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Response
{
    public class TourResponse
    {
        public int TourId { get; set; }

        public string? TourName { get; set; }

        public string? Description { get; set; }
        public string? Transportation { get; set; }
        public int Duration { get; set; }
 
        public decimal AdultPrice { get; set; }

        public decimal ChildPrice { get; set; }

        public string? PrimaryImageUrl { get; set; }

    }
}
