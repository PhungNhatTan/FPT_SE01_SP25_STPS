using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookTour.Models
{
    public enum PaymentTransactionStatus
    {
        Pending = 0,
        Success = 1,
        Failed = 2
    }

    public class PaymentTransaction
    {
        [Key]
        public int TransactionId { get; set; }

        [ForeignKey("Booking")]
        public int? BookingId { get; set; }

        [StringLength(50)]
        public string SimulatedTransactionId { get; set; } 

        [StringLength(50)]
        public string? VnpayTransactionId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "Pending"; 

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(500)]
        public string PaymentDetails { get; set; } 


        public virtual Booking Booking { get; set; }

    }
}
