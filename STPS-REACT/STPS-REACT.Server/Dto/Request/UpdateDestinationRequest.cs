using Microsoft.AspNetCore.Http;

namespace STPS_REACT.Server.Dto.Request
{
    public class UpdateDestinationRequest
    {
        public int DestinationId { get; set; }
        public string DestinationName { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public bool IsFeatured { get; set; }
        public List<IFormFile>? NewImages { get; set; }
        public List<int>? DeleteImageIds { get; set; }
        public List<DestinationDetailRequest>? Details { get; set; }
    }
} 