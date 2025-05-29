namespace BookTour.Dto.Response
{
    public class DestinationDetailResponse
    {
        public int DestinationId { get; set; }
        public string DestinationName { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public bool IsFeatured { get; set; }
        public string imageCover { get; set; }
        public List<DestinationImageResponse> Images { get; set; }
        public List<DestinationDetailItemResponse> Details { get; set; }
        public List<TourResponse> RelatedTours { get; set; }
    }

    public class DestinationImageResponse
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public bool IsPrimary { get; set; }
    }

    public class DestinationDetailItemResponse
    {
        public int DetailId { get; set; }
        public string FeatureType { get; set; }
        public string FeatureValue { get; set; }
    }
}