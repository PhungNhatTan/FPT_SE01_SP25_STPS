using BookTour.Dto.Common;
using BookTour.Dto.Response;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<CityResponse>>>> GetCities()
        {
            var response = await _cityService.GetAllCitiesAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<CityDetailResponse>>> GetCity(int id)
        {
            var response = await _cityService.GetCityByIdAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Thành phố không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }
    }
}