using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class SavedTour
    {
        [Key]
        public int SavedTourId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        public DateTime SavedDate { get; set; } = DateTime.Now;

        public virtual User User { get; set; }
        public virtual Tour Tour { get; set; }
    }
}