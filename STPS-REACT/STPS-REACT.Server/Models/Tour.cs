using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Tour
    {
        [Key]
        public int TourId { get; set; }

        [StringLength(100)]
        public string TourName { get; set; }

        public string Description { get; set; }

        public int Duration { get; set; }

        [StringLength(100)]
        public string Transportation { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AdultPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ChildPrice { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsFeatured { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public virtual ICollection<TourDestination> TourDestinations { get; set; }
        public virtual ICollection<TourImage> TourImages { get; set; }
        public virtual ICollection<TourSchedule> TourSchedules { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<SavedTour> SavedTours { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}