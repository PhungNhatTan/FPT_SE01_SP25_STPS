namespace STPS_REACT.Server.DTO
{
    public class TourDTO
    {
        public required String TourId { get; set; }
        public String? TourName { get; set; }
        public ICollection<Models.Receipt>? Receipts { get; set; }
        public ICollection<Models.TourFeedback>? TourFeedbacks { get; set; }
    }
}
