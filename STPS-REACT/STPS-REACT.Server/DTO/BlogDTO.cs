using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DTO
{
    public class BlogDTO
    {
        public String AccountId { get; set; }
        public String BlogId { get; set; }
        public String BlogName { get; set; }
        public String BlogContent { get; set; }
        public Account Account { get; set; }
    }
}
