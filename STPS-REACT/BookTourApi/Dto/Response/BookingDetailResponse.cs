using System;

namespace BookTour.Dto.Response
{
    public class BookingDetailResponse
    {
        public int BookingId { get; set; }
        public string TourName { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentStatus { get; set; }
        public DateTime? PaymentTime { get; set; }
        public int NumberOfGuests { get; set; }
        public DateTime TourDate { get; set; }
        public string Status { get; set; }
        public string PassengerName { get; set; }
        public DateTime CreatedAt { get; set; }

        public bool isRefund {  get; set; }

        // Group refund info in a holder object
        public RefundHolder Refund { get; set; }

        public class RefundHolder
        {
            public int? RefundRequestId { get; set; }
            public decimal? RefundAmount { get; set; }
            public string RefundStatus { get; set; }
            public DateTime? RefundRequestDate { get; set; }
            public DateTime? RefundProcessedDate { get; set; }
            public string RefundReason { get; set; }
            public string RefundAdminNotes { get; set; }
            public string RefundBankAccount { get; set; }
            public string RefundBankName { get; set; }
            public string RefundAccountHolderName { get; set; }
        }
    }
} 