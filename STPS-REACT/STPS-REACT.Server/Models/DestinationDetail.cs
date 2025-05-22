using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class DestinationDetail
    {
        [Key]
        public int DetailId { get; set; }

        [ForeignKey("Destination")]
        public int DestinationId { get; set; }

        [StringLength(100)]
        public string FeatureType { get; set; }

        [StringLength(255)]
        public string FeatureValue { get; set; }

        public virtual Destination Destination { get; set; }
    }
}
