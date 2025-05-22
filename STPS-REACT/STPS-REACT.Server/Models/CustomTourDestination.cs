using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class CustomTourDestination
    {
        [Key]
        public int CustomDestinationId { get; set; }

        [ForeignKey("CustomTour")]
        public int CustomTourId { get; set; }

        [ForeignKey("Destination")]
        public int DestinationId { get; set; }

        public int OrderNumber { get; set; }

        public virtual CustomTour CustomTour { get; set; }
        public virtual Destination Destination { get; set; }
    }
}
