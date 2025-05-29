﻿using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomToursController : ControllerBase
    {
        private readonly ICustomTourService _customTourService;

        public CustomToursController(ICustomTourService customTourService)
        {
            _customTourService = customTourService;
        }

        // GET: api/CustomTours
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<CustomTourResponse>>>> GetCustomTours()
        {
            var response = await _customTourService.GetAllCustomToursAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/CustomTours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<CustomTourResponse>>> GetCustomTour(int id)
        {
            var response = await _customTourService.GetCustomTourByIdAsync(id);
            if (!response.Success)
            {
                if (response.Message.Contains("không tồn tại"))
                {
                    return NotFound(response);
                }
                return StatusCode(500, response);
            }
            return Ok(response);
        }

        // GET: api/CustomTours/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<ApiResponse<List<CustomTourResponse>>>> GetCustomToursByUser(int userId)
        {
            var response = await _customTourService.GetCustomToursByUserIdAsync(userId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // POST: api/CustomTours
        [HttpPost]
        public async Task<ActionResult<ApiResponse<CustomTourResponse>>> CreateCustomTour([FromBody] CreateCustomTourRequest request)
        {
            var response = await _customTourService.CreateCustomTourAsync(request);
            if (!response.Success)
            {
                return StatusCode(500, response);
            }
            return Ok(response);
        }

        // PUT: api/CustomTours
        [HttpPut]
        public async Task<ActionResult<ApiResponse<CustomTourResponse>>> UpdateCustomTour([FromBody] UpdateCustomTourRequest request)
        {
            var response = await _customTourService.UpdateCustomTourAsync(request);
            if (!response.Success)
            {
                if (response.Message.Contains("không tồn tại"))
                {
                    return NotFound(response);
                }
                return StatusCode(500, response);
            }
            return Ok(response);
        }

        // DELETE: api/CustomTours/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteCustomTour(int id)
        {
            var response = await _customTourService.DeleteCustomTourAsync(id);
            if (!response.Success)
            {
                if (response.Message.Contains("không tồn tại"))
                {
                    return NotFound(response);
                }
                return StatusCode(500, response);
            }
            return Ok(response);
        }
    }
}
