using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class TourismCompany
    {
        [Key]
        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string RepresentativeName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string TaxCode { get; set; }
    }
}
