﻿using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;

namespace STPS_REACT.Server.Service
{
    public interface ICustomTourService
    {
        Task<ApiResponse<List<CustomTourResponse>>> GetAllCustomToursAsync();
        Task<ApiResponse<List<CustomTourResponse>>> GetCustomToursByUserIdAsync(int userId);
        Task<ApiResponse<CustomTourResponse>> GetCustomTourByIdAsync(int id);
        Task<ApiResponse<CustomTourResponse>> CreateCustomTourAsync(CreateCustomTourRequest request);
        Task<ApiResponse<CustomTourResponse>> UpdateCustomTourAsync(UpdateCustomTourRequest request);
        Task<ApiResponse<bool>> DeleteCustomTourAsync(int id);
    }
}
