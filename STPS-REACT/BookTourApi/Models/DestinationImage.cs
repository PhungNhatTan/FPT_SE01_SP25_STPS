using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class DestinationImage
    {
        [Key]
        public int ImageId { get; set; }

        [ForeignKey("Destination")]
        public int DestinationId { get; set; }

        [StringLength(255)]
        public string ImageUrl { get; set; }

        public bool IsPrimary { get; set; } = false;

        public virtual Destination Destination { get; set; }
    }
}