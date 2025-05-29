using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface ITourismCompanyService
    {
        Task<ApiResponse<List<TourismCompanyResponse>>> GetAllCompaniesAsync();
        Task<ApiResponse<TourismCompanyResponse>> GetCompanyByIdAsync(int id);
        Task<ApiResponse<TourismCompanyResponse>> CreateCompanyAsync(CreateTourismCompanyRequest request);
        Task<ApiResponse<TourismCompanyResponse>> UpdateCompanyAsync(UpdateTourismCompanyRequest request);
        Task<ApiResponse<bool>> DeleteCompanyAsync(int id);
        Task<ApiResponse<bool>> UpdateCompanyStatusAsync(int id, bool isActive);
        // New method for User relationship
        Task<ApiResponse<TourismCompanyResponse>> GetCompanyByUserIdAsync(int userId);
    }
}