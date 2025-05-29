using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Dto.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service
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