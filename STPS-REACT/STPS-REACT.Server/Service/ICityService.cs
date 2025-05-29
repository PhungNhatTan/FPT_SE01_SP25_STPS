using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Response;

namespace STPS_REACT.Server.Service
{
    public interface ICityService
    {
        Task<ApiResponse<List<CityResponse>>> GetAllCitiesAsync();
        Task<ApiResponse<CityDetailResponse>> GetCityByIdAsync(int id);
    }
}