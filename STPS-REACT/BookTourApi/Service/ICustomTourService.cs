﻿using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;

namespace BookTour.Service
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
