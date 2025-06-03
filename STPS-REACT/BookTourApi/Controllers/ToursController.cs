using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using BookTourApi.Utils;

namespace BookTourApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly ITourService _tourService;
        private readonly ILogger<ToursController> _logger;

        public ToursController(ITourService tourService, ILogger<ToursController> logger)
        {
            _tourService = tourService;
            _logger = logger;
        }

        // GET: api/Tours
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetTours()
        {
            var response = await _tourService.GetAllToursAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Tours/Featured
        [HttpGet("Featured")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetFeaturedTours()
        {
            var response = await _tourService.GetFeaturedToursAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Tours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TourDetailResponse>>> GetTour(int id)
        {
            var response = await _tourService.GetTourByIdAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost("Search")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> SearchTours(SearchTourRequest request)
        {
            var response = await _tourService.SearchToursAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost("Book")]
        public async Task<ActionResult<ApiResponse<BookingResponse>>> BookTour(BookTourRequest request)
        {
            Console.WriteLine($"BookTour API called with request: {System.Text.Json.JsonSerializer.Serialize(request)}");

            if (request == null)
            {
                return BadRequest(ApiResponse<BookingResponse>.ErrorResponse("Request không hợp lệ"));
            }

            if (request.TourId <= 0)
            {
                return BadRequest(ApiResponse<BookingResponse>.ErrorResponse($"TourId không hợp lệ: {request.TourId}"));
            }

            var response = await _tourService.BookTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }


        [HttpGet("BookingHistory/{userId}")]
        public async Task<ActionResult<ApiResponse<List<BookingResponse>>>> GetBookingHistory(int userId)
        {
            var response = await _tourService.GetBookingHistoryAsync(userId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpGet("Company/{companyId}")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetToursByCompany(int companyId)
        {
            var response = await _tourService.GetToursByCompanyIdAsync(companyId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<TourResponse>>> AddTour([FromForm] CreateTourRequest request, IFormFile? image)
        {
            if(image != null && image.Length > 0 && image.ContentType.StartsWith("image/"))
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                request.ImageUrl = await FileUploadHelper.UploadImageAsync(image, uploadsFolder);
            }
            var response = await _tourService.AddTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<TourResponse>>> UpdateTour(int id, [FromForm] UpdateTourRequest request, IFormFile? image)
        {
            if (id != request.TourId)
            {
                return BadRequest(ApiResponse<TourResponse>.ErrorResponse("Id không khớp"));
            }
            if (image != null && image.Length > 0 && image.ContentType.StartsWith("image/"))
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                request.ImageUrl = await FileUploadHelper.UploadImageAsync(image, uploadsFolder);
            }
            var response = await _tourService.UpdateTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteTour(int id)
        {
            var response = await _tourService.DeleteTourAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }
    }
}