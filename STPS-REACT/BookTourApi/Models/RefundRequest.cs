using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookTour.Models
{
    public class RefundRequest
    {
        [Key]
        public int RefundRequestId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }
        [StringLength(50)]
        public string CustomerBankAccount { get; set; }

        [StringLength(100)]
        public string CustomerBankName { get; set; }

        [StringLength(100)]
        public string CustomerAccountHolderName { get; set; }

        // Số tiền hoàn trả
        [Column(TypeName = "decimal(18,2)")]
        public decimal RefundAmount { get; set; } // 90% của TotalAmount

        [Column(TypeName = "decimal(18,2)")]
        public decimal CompanyCompensation { get; set; } // 5% cho công ty

        [Column(TypeName = "decimal(18,2)")]
        public decimal AdminFee { get; set; } // 5% admin giữ

        [StringLength(20)]
        public string Status { get; set; } = "Pending"; 

        public DateTime RequestDate { get; set; } = DateTime.Now;

        public DateTime? ProcessedDate { get; set; }

        [StringLength(500)]
        public string? Reason { get; set; }

        [StringLength(500)]
        public string? AdminNotes { get; set; }

        // Navigation Properties
        public virtual Booking Booking { get; set; }
    }
}
