using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Service;
using STPS_REACT.Server.Dto.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly IWebHostEnvironment _env;
        public BlogController(IBlogService blogService, IWebHostEnvironment env)
        {
            _blogService = blogService;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<BlogResponse>>>> GetAll()
        {
            var response = await _blogService.GetAllBlogsAsync();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<BlogResponse>>> GetById(int id)
        {
            var response = await _blogService.GetBlogByIdAsync(id);
            if (!response.Success)
                return NotFound(response);
            return Ok(response);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<BlogResponse>>> Add([FromForm] CreateBlogRequest request)
        {
            var imagePathRoot = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(imagePathRoot))
                Directory.CreateDirectory(imagePathRoot);
            var response = await _blogService.AddBlogAsync(request, imagePathRoot);
            return Ok(response);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<BlogResponse>>> Update(int id, [FromForm] UpdateBlogRequest request)
        {
            if (id != request.Id)
                return BadRequest(ApiResponse<BlogResponse>.ErrorResponse("Id không khớp"));
            var imagePathRoot = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(imagePathRoot))
                Directory.CreateDirectory(imagePathRoot);
            var response = await _blogService.UpdateBlogAsync(request, imagePathRoot);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _blogService.DeleteBlogAsync(id);
            if (!response.Success)
                return NotFound(response);
            return Ok(response);
        }
    }
} 