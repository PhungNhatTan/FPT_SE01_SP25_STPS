namespace STPS_REACT.Server.DTO
{
    public class TourFeedbackDTO
    {
        public required String FeedbackId { get; set; }
        public required String AccountId { get; set; }
        public required String TourId { get; set; }
        public int? Rating { get; set; }
        public String? FeedbackDetail { get; set; }
        public DateOnly? Date { get; set; }
        public ICollection<Models.Account>? Accounts { get; set; }

    }
}
