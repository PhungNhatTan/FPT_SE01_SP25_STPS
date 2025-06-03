using System;
using System.Collections.Generic;

namespace BookTourApi.Dto.Response
{
    public class CompanyBookingResponse
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime TourDate { get; set; }
        public int AdultCount { get; set; }
        public int ChildCount { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentMethod { get; set; }
        public CustomerInfo Customer { get; set; }
        public TourInfo Tour { get; set; }
        public List<PaymentInfo> Payments { get; set; }
        public RefundInfo Refund { get; set; }
    }

    public class CustomerInfo
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class TourInfo
    {
        public int TourId { get; set; }
        public string TourName { get; set; }
    }

    public class PaymentInfo
    {
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class RefundInfo
    {
        public int RefundRequestId { get; set; }
        public decimal RefundAmount { get; set; }
        public string Status { get; set; }
        public DateTime RequestDate { get; set; }
    }
} 