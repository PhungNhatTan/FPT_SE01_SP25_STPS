using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Blog
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string image {  get; set; }
    }
}
