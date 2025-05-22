using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class BookingDetail
    {
        [Key]
        public int BookingDetailId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [StringLength(100)]
        public string PassengerName { get; set; }

        [StringLength(20)]
        public string PassengerType { get; set; } // "Adult" hoặc "Child"

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public virtual Booking Booking { get; set; }
    }
}