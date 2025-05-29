using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ApiResponse<List<UserResponse>>> GetAllUsers()
        {
            return await _userService.GetAllUsersAsync();
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<UserResponse>> GetUserById(int id)
        {
            return await _userService.GetUserByIdAsync(id);
        }

        [HttpPost]
        public async Task<ApiResponse<UserResponse>> CreateUser([FromBody] CreateUserRequest request)
        {
            return await _userService.CreateUserAsync(request);
        }

        [HttpPut("{id}")]
        public async Task<ApiResponse<UserResponse>> UpdateUser(int id, [FromBody] UpdateUserRequest request)
        {
            request.UserId = id;
            return await _userService.UpdateUserAsync(request);
        }

        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> DeleteUser(int id)
        {
            return await _userService.DeleteUserAsync(id);
        }

        
    }
} 