using BookTour.Dto.Common;
using BookTour.Dto.Response;
using BookTour.Dto.Request;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationService _destinationService;
        private readonly IWebHostEnvironment _env;

        public DestinationsController(IDestinationService destinationService, IWebHostEnvironment env)
        {
            _destinationService = destinationService;
            _env = env;
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<DestinationListResponse>>>> GetDestinations()
        {
            var response = await _destinationService.GetAllDestinationsAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Destinations/Featured
        [HttpGet("Featured")]
        public async Task<ActionResult<ApiResponse<List<DestinationListResponse>>>> GetFeaturedDestinations()
        {
            var response = await _destinationService.GetFeaturedDestinationsAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<DestinationDetailResponse>>> GetDestination(int id)
        {
            var response = await _destinationService.GetDestinationByIdAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Điểm đến không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Destinations/City/5
        [HttpGet("City/{cityId}")]
        public async Task<ActionResult<ApiResponse<List<DestinationListResponse>>>> GetDestinationsByCity(int cityId)
        {
            var response = await _destinationService.GetDestinationsByCityIdAsync(cityId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // POST: api/Destinations
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<DestinationDetailResponse>>> AddDestination([FromForm] CreateDestinationRequest request)
        {
            var imagePathRoot = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(imagePathRoot))
                Directory.CreateDirectory(imagePathRoot);

            var response = await _destinationService.AddDestinationAsync(request, imagePathRoot);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // PUT: api/Destinations/5
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ApiResponse<DestinationDetailResponse>>> UpdateDestination(int id, [FromForm] UpdateDestinationRequest request)
        {
            if (id != request.DestinationId)
                return BadRequest(ApiResponse<DestinationDetailResponse>.ErrorResponse("Id không khớp"));

            var imagePathRoot = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(imagePathRoot))
                Directory.CreateDirectory(imagePathRoot);

            var response = await _destinationService.UpdateDestinationAsync(request, imagePathRoot);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Điểm đến không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }

        // DELETE: api/Destinations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteDestination(int id)
        {
            var response = await _destinationService.DeleteDestinationAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Điểm đến không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }
    }
}