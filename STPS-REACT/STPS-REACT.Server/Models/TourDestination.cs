using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class TourDestination
    {
        [Key]
        public int TourDestinationId { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        [ForeignKey("Destination")]
        public int DestinationId { get; set; }

        public int OrderNumber { get; set; }

        public virtual Tour Tour { get; set; }
        public virtual Destination Destination { get; set; }
    }
}
