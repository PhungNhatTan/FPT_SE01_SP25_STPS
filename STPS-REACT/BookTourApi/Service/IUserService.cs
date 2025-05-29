using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface IUserService
    {
        Task<ApiResponse<List<UserResponse>>> GetAllUsersAsync();
        Task<ApiResponse<UserResponse>> GetUserByIdAsync(int id);
        Task<ApiResponse<UserResponse>> CreateUserAsync(CreateUserRequest request);
        Task<ApiResponse<UserResponse>> UpdateUserAsync(UpdateUserRequest request);
        Task<ApiResponse<bool>> DeleteUserAsync(int id);
    }
} 