namespace BookTour.Dto.Response
{
    public class DestinationListResponse
    {
        public int DestinationId { get; set; }
        public string DestinationName { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public bool IsFeatured { get; set; }
        public string PrimaryImageUrl { get; set; }
    }
}