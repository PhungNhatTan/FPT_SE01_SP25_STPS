namespace STPS_REACT.Server.Dto.Response
{
    public class CustomTourResponse
    {
        public int CustomTourId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string TourName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }
        public decimal? EstimatedPrice { get; set; }
        public List<CustomTourDestinationResponse> Destinations { get; set; }
    }

    public class CustomTourDestinationResponse
    {
        public int DestinationId { get; set; }
        public string DestinationName { get; set; }
        public string CityName { get; set; }
        public int OrderNumber { get; set; }
        public decimal Price { get; set; } // Giá của điểm đến
        public string PriceFormatted { get; set; } // Giá đã định dạng (VD: "250.000 VND")
    }
}
