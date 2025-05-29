namespace BookTour.Dto.Request
{
    public class SearchTourRequest
    {
        public string Destination { get; set; }  
        public decimal? MinPrice { get; set; }  
        public decimal? MaxPrice { get; set; } 
        public int? Duration { get; set; } 
    }
}