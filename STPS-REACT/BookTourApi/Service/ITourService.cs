using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface ITourService
    {
        Task<ApiResponse<List<TourResponse>>> GetAllToursAsync();
        Task<ApiResponse<List<TourResponse>>> GetFeaturedToursAsync();
        Task<ApiResponse<TourDetailResponse>> GetTourByIdAsync(int id);
        Task<ApiResponse<List<TourResponse>>> SearchToursAsync(SearchTourRequest request);
        Task<ApiResponse<BookingResponse>> BookTourAsync(BookTourRequest request);
        Task<ApiResponse<List<BookingResponse>>> GetBookingHistoryAsync(int userId);
        // New method for TourismCompany relationship
        Task<ApiResponse<List<TourResponse>>> GetToursByCompanyIdAsync(int companyId);
        // CRUD
        Task<ApiResponse<TourResponse>> AddTourAsync(CreateTourRequest request);
        Task<ApiResponse<TourResponse>> UpdateTourAsync(UpdateTourRequest request);
        Task<ApiResponse<bool>> DeleteTourAsync(int id);
    }
}