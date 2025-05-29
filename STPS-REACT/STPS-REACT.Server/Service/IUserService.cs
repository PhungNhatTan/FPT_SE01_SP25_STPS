using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service
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