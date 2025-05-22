using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Destination
    {
        [Key]
        public int DestinationId { get; set; }

        [StringLength(100)]
        public string DestinationName { get; set; }

        public string Description { get; set; }

        [ForeignKey("City")]
        public int CityId { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsFeatured { get; set; } = false;

        public virtual City City { get; set; }
        public virtual ICollection<TourDestination> TourDestinations { get; set; }
        public virtual ICollection<DestinationImage> DestinationImages { get; set; }
        public virtual ICollection<DestinationDetail> DestinationDetails { get; set; }
        public virtual ICollection<CustomTourDestination> CustomTourDestinations { get; set; }
    }
}
