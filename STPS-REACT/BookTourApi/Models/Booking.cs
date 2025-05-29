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

        // Computed Properties for Business Logic
        public DateTime CancellationDeadline => TourDate.AddDays(-3);

        // Revenue Transfer Logic:
        // - Nếu đặt trong vòng 3 ngày trước tour → Chuyển tiền ngay (BookingDate)
        // - Nếu đặt > 3 ngày trước tour → Chuyển tiền vào deadline (TourDate - 3 days)
        public DateTime RevenueTransferDate =>
            (TourDate - BookingDate).TotalDays <= 3 ? BookingDate : TourDate.AddDays(-3);

        public bool CanCancel => DateTime.Now < CancellationDeadline && PaymentStatus == "Đã thanh toán" && Status != "Đã hủy";
        public bool ShouldTransferRevenue => DateTime.Now >= RevenueTransferDate && PaymentStatus == "Đã thanh toán" && Status != "Đã hủy";

        // Navigation Properties
        public virtual User User { get; set; }
        public virtual Tour Tour { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }
        public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; }
        public virtual ICollection<RevenueTransaction> RevenueTransactions { get; set; }
        public virtual RefundRequest RefundRequest { get; set; }
    }
}