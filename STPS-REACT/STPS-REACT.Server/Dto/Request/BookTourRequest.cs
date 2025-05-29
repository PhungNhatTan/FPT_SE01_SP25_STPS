using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Request
{
    public class BookTourRequest
    {
        [Required]
        public int TourId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime TourDate { get; set; }

        [Required]
        [Range(0, 100)]
        public int AdultCount { get; set; }

        [Required]
        [Range(0, 100)]
        public int ChildCount { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        // Thêm các trường giá từ frontend
        public decimal? AdultPrice { get; set; }
        public decimal? ChildPrice { get; set; }
        public decimal? TotalPrice { get; set; }

        public List<PassengerRequest> Passengers { get; set; } = new List<PassengerRequest>();
    }

    public class PassengerRequest
    {
        [Required]
        public string PassengerName { get; set; }

        [Required]
        public string PassengerType { get; set; }  // "adult" hoặc "child"
    }
}