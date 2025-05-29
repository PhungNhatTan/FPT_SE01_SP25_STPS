using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class City
    {
        [Key]
        public int CityId { get; set; }

        [StringLength(100)]
        public string CityName { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual ICollection<Destination> Destinations { get; set; }
    }
}
