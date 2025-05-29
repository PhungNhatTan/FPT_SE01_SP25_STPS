using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class CustomTour
    {
        [Key]
        public int CustomTourId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [StringLength(100)]
        public string TourName { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [StringLength(50)]
        public string Status { get; set; } = "Đang tạo";

        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedPrice { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<CustomTourDestination> CustomTourDestinations { get; set; }
    }
}
