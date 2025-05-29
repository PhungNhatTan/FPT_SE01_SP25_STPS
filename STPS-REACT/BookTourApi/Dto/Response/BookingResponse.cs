namespace BookTour.Dto.Response
{
    public class BookingResponse
    {
        public int BookingId { get; set; }  
        public string TourName { get; set; } 
        public DateTime TourDate { get; set; }  
        public int AdultCount { get; set; }  
        public int ChildCount { get; set; } 
        public decimal TotalAmount { get; set; } 
        public string Status { get; set; }  
        public string PaymentStatus { get; set; }  
        public DateTime BookingDate { get; set; }
        public string ImageUrl { get; set; }
    }
}