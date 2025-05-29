using BookTour.Dto.Common;
using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Repository;

namespace BookTour.Service.Impl
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _cityRepository;

        public CityService(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public async Task<ApiResponse<List<CityResponse>>> GetAllCitiesAsync()
        {
            try
            {
                var cities = await _cityRepository.GetAllCitiesAsync();
                var response = cities.Select(MapToCityResponse).ToList();
                return ApiResponse<List<CityResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<CityResponse>>.ErrorResponse($"Lỗi khi lấy danh sách thành phố: {ex.Message}");
            }
        }

        public async Task<ApiResponse<CityDetailResponse>> GetCityByIdAsync(int id)
        {
            try
            {
                var city = await _cityRepository.GetCityByIdAsync(id);
                if (city == null)
                {
                    return ApiResponse<CityDetailResponse>.ErrorResponse("Thành phố không tồn tại");
                }

                var response = MapToCityDetailResponse(city);
                return ApiResponse<CityDetailResponse>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<CityDetailResponse>.ErrorResponse($"Lỗi khi lấy chi tiết thành phố: {ex.Message}");
            }
        }

        #region Helper Methods
        private CityResponse MapToCityResponse(City city)
        {
            return new CityResponse
            {
                CityId = city.CityId,
                CityName = city.CityName,
                Description = city.Description
            };
        }

        private CityDetailResponse MapToCityDetailResponse(City city)
        {
            return new CityDetailResponse
            {
                CityId = city.CityId,
                CityName = city.CityName,
                Description = city.Description,
                Destinations = city.Destinations.Where(d => d.IsActive).Select(d => new DestinationListResponse
                {
                    DestinationId = d.DestinationId,
                    DestinationName = d.DestinationName,
                    Description = d.Description,
                    CityId = d.CityId,
                    CityName = city.CityName,
                    IsFeatured = d.IsFeatured,
                    PrimaryImageUrl = d.DestinationImages
                        .FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                        d.DestinationImages.FirstOrDefault()?.ImageUrl
                }).ToList()
            };
        }
        #endregion
    }
}