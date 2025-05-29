namespace BookTour.Dto.Response
{
    public class TourDetailResponse
    {
        public int TourId { get; set; }

        public string TourName { get; set; }

        public string Description { get; set; }

        public int Duration { get; set; }

        public string Transportation { get; set; }

        public decimal AdultPrice { get; set; }

        public decimal ChildPrice { get; set; }

        public bool IsFeatured { get; set; }

        public string imageCover {  get; set; }
        public List<TourImageResponse> Images { get; set; } = new List<TourImageResponse>();

        public List<TourScheduleResponse> Schedules { get; set; } = new List<TourScheduleResponse>();

        public List<DestinationResponse> Destinations { get; set; } = new List<DestinationResponse>();

        public List<ReviewResponse> Reviews { get; set; } = new List<ReviewResponse>();
    }

    public class TourImageResponse
    {
        public int ImageId { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPrimary { get; set; }
    }

    public class TourScheduleResponse
    {
        public int ScheduleId { get; set; }

        public int DayNumber { get; set; }

        public string Description { get; set; }

        public string Activities { get; set; }
    }

    public class DestinationResponse
    {
        public int DestinationId { get; set; }

        public string DestinationName { get; set; }

        public string Description { get; set; }

        public string PrimaryImageUrl { get; set; }
    }

    public class ReviewResponse
    {
        public int ReviewId { get; set; }

        public string UserName { get; set; }

        public int Rating { get; set; }

        public string Comment { get; set; }

        public DateTime ReviewDate { get; set; }
    }
}
