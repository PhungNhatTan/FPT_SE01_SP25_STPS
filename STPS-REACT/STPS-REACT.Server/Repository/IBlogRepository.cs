using STPS_REACT.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Repository
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blog>> GetAllBlogsAsync();
        Task<Blog> GetBlogByIdAsync(int id);
        Task<Blog> AddBlogAsync(Blog blog);
        Task<Blog> UpdateBlogAsync(Blog blog);
        Task<bool> DeleteBlogAsync(int id);
    }
} 