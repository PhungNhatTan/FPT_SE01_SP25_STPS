using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Dto.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface IBlogService
    {
        Task<ApiResponse<List<BlogResponse>>> GetAllBlogsAsync();
        Task<ApiResponse<BlogResponse>> GetBlogByIdAsync(int id);
        Task<ApiResponse<BlogResponse>> AddBlogAsync(CreateBlogRequest request, string imagePathRoot);
        Task<ApiResponse<BlogResponse>> UpdateBlogAsync(UpdateBlogRequest request, string imagePathRoot);
        Task<ApiResponse<bool>> DeleteBlogAsync(int id);
    }
} 