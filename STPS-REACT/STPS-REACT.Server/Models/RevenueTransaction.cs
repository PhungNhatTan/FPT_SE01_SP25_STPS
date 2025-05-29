using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STPS_REACT.Server.Models
{
    public class RevenueTransaction
    {
        [Key]
        public int RevenueTransactionId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [ForeignKey("TourismCompany")]
        public int TourismCompanyId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; } // Tổng tiền booking

        [Column(TypeName = "decimal(18,2)")]
        public decimal AdminFee { get; set; } // 5% admin giữ

        [Column(TypeName = "decimal(18,2)")]
        public decimal CompanyAmount { get; set; } // 95% cho công ty (hoặc 5% nếu refund)

        [Column(TypeName = "decimal(18,2)")]
        public decimal? CustomerRefund { get; set; } // 90% nếu là refund

        [StringLength(30)]
        public string TransactionType { get; set; } 
        // "Revenue" = Chuyển tiền sau deadline (95% cho công ty)
        // "Refund" = Khách hủy (90% cho khách, 5% cho công ty)

        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Failed"

        public DateTime ScheduledDate { get; set; } // Ngày dự kiến xử lý (TourDate - 3 days)

        public DateTime? ProcessedDate { get; set; } // Ngày thực tế xử lý

        [StringLength(500)]
        public string Notes { get; set; }

        // Navigation Properties
        public virtual Booking Booking { get; set; }
        public virtual TourismCompany TourismCompany { get; set; }
    }
}
