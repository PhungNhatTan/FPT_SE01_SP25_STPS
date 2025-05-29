using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service
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