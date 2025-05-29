namespace BookTour.Dto.Response
{
    public class CityDetailResponse
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string Description { get; set; }
        public List<DestinationListResponse> Destinations { get; set; }
    }
}
