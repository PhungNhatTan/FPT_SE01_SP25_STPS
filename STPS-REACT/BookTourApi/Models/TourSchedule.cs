using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class TourSchedule
    {
        [Key]
        public int ScheduleId { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        public int DayNumber { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public string Activities { get; set; }

        public virtual Tour Tour { get; set; }
    }
}