using BookTour.Dto.Common;
using BookTour.Dto.Response;

namespace BookTour.Service
{
    public interface ICityService
    {
        Task<ApiResponse<List<CityResponse>>> GetAllCitiesAsync();
        Task<ApiResponse<CityDetailResponse>> GetCityByIdAsync(int id);
    }
}