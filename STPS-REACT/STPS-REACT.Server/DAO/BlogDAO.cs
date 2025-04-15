using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DAO
{
    public class BlogDAO
    {
        private readonly StpsContext _context;
        public BlogDAO(StpsContext context)
        {
            _context = context;
        }
        public List<BlogDTO> GetHomepageBlog()
        {
            return _context.Blogs.Select(b => new BlogDTO
            {
                BlogId = b.BlogId,
                BlogName = b.BlogName,
                BlogContent = b.BlogContent,
                AccountId = b.AccountId,
                AccountName = b.Account.Username,
                Date = b.Date
            }).OrderByDescending(b => b.Date).Take(5).ToList();
        }
    }
}
