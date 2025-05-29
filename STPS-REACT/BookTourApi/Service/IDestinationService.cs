using BookTour.Dto.Common;
using BookTour.Dto.Response;
using BookTour.Dto.Request;

namespace BookTour.Service
{
    public interface IDestinationService
    {
        Task<ApiResponse<List<DestinationListResponse>>> GetAllDestinationsAsync();
        Task<ApiResponse<List<DestinationListResponse>>> GetFeaturedDestinationsAsync();
        Task<ApiResponse<DestinationDetailResponse>> GetDestinationByIdAsync(int id);
        Task<ApiResponse<List<DestinationListResponse>>> GetDestinationsByCityIdAsync(int cityId);
        // CRUD operations
        Task<ApiResponse<DestinationDetailResponse>> AddDestinationAsync(CreateDestinationRequest request, string imagePathRoot);
        Task<ApiResponse<DestinationDetailResponse>> UpdateDestinationAsync(UpdateDestinationRequest request, string imagePathRoot);
        Task<ApiResponse<bool>> DeleteDestinationAsync(int id);
    }
}