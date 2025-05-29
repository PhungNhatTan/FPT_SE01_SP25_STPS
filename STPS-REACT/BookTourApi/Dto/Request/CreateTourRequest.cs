namespace BookTour.Dto.Request
{
    public class CreateTourRequest
    {
        public string? TourName { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
        public string? Transportation { get; set; }
        public decimal AdultPrice { get; set; }
        public decimal ChildPrice { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;
        public int? TourismCompanyId { get; set; } // Add TourismCompanyId
    }

    public class UpdateTourRequest
    {
        public int TourId { get; set; }
        public string TourName { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public string Transportation { get; set; }
        public decimal AdultPrice { get; set; }
        public decimal ChildPrice { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;
        public int? TourismCompanyId { get; set; } // Add TourismCompanyId
    }
}