using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Repository;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace STPS_REACT.Server.Service.Impl
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        public BlogService(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public async Task<ApiResponse<List<BlogResponse>>> GetAllBlogsAsync()
        {
            var blogs = await _blogRepository.GetAllBlogsAsync();
            var result = blogs.Select(MapToResponse).ToList();
            return ApiResponse<List<BlogResponse>>.SuccessResponse(result);
        }

        public async Task<ApiResponse<BlogResponse>> GetBlogByIdAsync(int id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id);
            if (blog == null)
                return ApiResponse<BlogResponse>.ErrorResponse("Blog không tồn tại");
            return ApiResponse<BlogResponse>.SuccessResponse(MapToResponse(blog));
        }

        public async Task<ApiResponse<BlogResponse>> AddBlogAsync(CreateBlogRequest request, string imagePathRoot)
        {
            string imagePath = null;
            if (request.Image != null && request.Image.Length > 0)
            {
                var fileName = Path.GetFileNameWithoutExtension(request.Image.FileName) + "_" + System.Guid.NewGuid().ToString().Substring(0, 8) + Path.GetExtension(request.Image.FileName);
                var savePath = Path.Combine(imagePathRoot, fileName);
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }
                imagePath = "/uploads/" + fileName;
            }
            var blog = new Blog
            {
                Title = request.Title,
                Description = request.Description,
                image = imagePath
            };
            var created = await _blogRepository.AddBlogAsync(blog);
            return ApiResponse<BlogResponse>.SuccessResponse(MapToResponse(created), "Thêm blog thành công");
        }

        public async Task<ApiResponse<BlogResponse>> UpdateBlogAsync(UpdateBlogRequest request, string imagePathRoot)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(request.Id);
            if (blog == null)
                return ApiResponse<BlogResponse>.ErrorResponse("Blog không tồn tại");
            blog.Title = request.Title;
            blog.Description = request.Description;
            if (request.Image != null && request.Image.Length > 0)
            {
                var fileName = Path.GetFileNameWithoutExtension(request.Image.FileName) + "_" + System.Guid.NewGuid().ToString().Substring(0, 8) + Path.GetExtension(request.Image.FileName);
                var savePath = Path.Combine(imagePathRoot, fileName);
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }
                blog.image = "/uploads/" + fileName;
            }
            var updated = await _blogRepository.UpdateBlogAsync(blog);
            return ApiResponse<BlogResponse>.SuccessResponse(MapToResponse(updated), "Cập nhật blog thành công");
        }

        public async Task<ApiResponse<bool>> DeleteBlogAsync(int id)
        {
            var result = await _blogRepository.DeleteBlogAsync(id);
            if (!result)
                return ApiResponse<bool>.ErrorResponse("Blog không tồn tại");
            return ApiResponse<bool>.SuccessResponse(true, "Xóa blog thành công");
        }

        private BlogResponse MapToResponse(Blog b)
        {
            return new BlogResponse
            {
                Id = b.Id,
                Title = b.Title,
                Description = b.Description,
                Image = b.image
            };
        }
    }
} 