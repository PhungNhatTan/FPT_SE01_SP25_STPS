using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        public DateTime BookingDate { get; set; } = DateTime.Now;

        public DateTime TourDate { get; set; }

        public int AdultCount { get; set; } = 0;

        public int ChildCount { get; set; } = 0;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Đang chờ";

        [StringLength(50)]
        public string PaymentStatus { get; set; } = "Chưa thanh toán";

        [StringLength(50)]
        public string PaymentMethod { get; set; }

        public virtual User User { get; set; }
        public virtual Tour Tour { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }
    }
}