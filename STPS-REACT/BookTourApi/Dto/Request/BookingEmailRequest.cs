﻿namespace BookTour.Dto.Request
{
    public class BookingEmailRequest
    {
        public string RecipientEmail { get; set; }
        public string Subject { get; set; } = "Xác nhận đặt tour thành công";
        public string TourName { get; set; }
        public string BookingDate { get; set; }
        public int AdultCount { get; set; }
        public int ChildCount { get; set; }
        public string AdultPrice { get; set; }
        public string ChildPrice { get; set; }
        public string TotalPrice { get; set; }
        public string BookingId { get; set; }
        public string RecipientName { get; set; }
        public List<string> Destinations { get; set; }
        public bool IncludeQRCode { get; set; } = true;
    }
}
