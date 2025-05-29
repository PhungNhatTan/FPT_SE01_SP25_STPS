using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class TourImage
    {
        [Key]
        public int ImageId { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        [StringLength(255)]
        public string ImageUrl { get; set; }

        public bool IsPrimary { get; set; } = false;

        public virtual Tour Tour { get; set; }
    }
}