using Microsoft.AspNetCore.Http;

namespace BookTour.Dto.Request
{
    public class CreateDestinationRequest
    {
        public string DestinationName { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public bool IsFeatured { get; set; }
        public List<IFormFile>? Images { get; set; }
        public List<DestinationDetailRequest>? Details { get; set; }
    }

    public class DestinationDetailRequest
    {
        public string FeatureType { get; set; }
        public string FeatureValue { get; set; }
    }
} 