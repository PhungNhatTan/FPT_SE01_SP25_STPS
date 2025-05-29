using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Models
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
