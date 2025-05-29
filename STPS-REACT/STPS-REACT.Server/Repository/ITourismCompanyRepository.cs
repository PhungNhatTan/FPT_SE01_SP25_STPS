using STPS_REACT.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Repository
{
    public interface ITourismCompanyRepository
    {
        Task<List<TourismCompany>> GetAllCompaniesAsync();
        Task<TourismCompany> GetCompanyByIdAsync(int id);
        Task<TourismCompany> CreateCompanyAsync(TourismCompany company);
        Task UpdateCompanyAsync(TourismCompany company);
        Task<bool> DeleteCompanyAsync(int id);
        // New method for User relationship
        Task<TourismCompany> GetCompanyByUserIdAsync(int userId);
    }
}