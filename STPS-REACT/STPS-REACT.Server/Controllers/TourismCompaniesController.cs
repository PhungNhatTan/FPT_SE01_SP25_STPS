using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourismCompaniesController : ControllerBase
    {
        private readonly ITourismCompanyService _companyService;

        public TourismCompaniesController(ITourismCompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<ApiResponse<List<TourismCompanyResponse>>> GetAllCompanies()
        {
            return await _companyService.GetAllCompaniesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<TourismCompanyResponse>> GetCompanyById(int id)
        {
            return await _companyService.GetCompanyByIdAsync(id);
        }

        [HttpGet("User/{userId}")]
        public async Task<ApiResponse<TourismCompanyResponse>> GetCompanyByUserId(int userId)
        {
            return await _companyService.GetCompanyByUserIdAsync(userId);
        }

        [HttpPost]
        public async Task<ApiResponse<TourismCompanyResponse>> CreateCompany([FromBody] CreateTourismCompanyRequest request)
        {
            return await _companyService.CreateCompanyAsync(request);
        }

        [HttpPut("{id}")]
        public async Task<ApiResponse<TourismCompanyResponse>> UpdateCompany(int id, [FromBody] UpdateTourismCompanyRequest request)
        {
            request.Id = id;
            return await _companyService.UpdateCompanyAsync(request);
        }

        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> DeleteCompany(int id)
        {
            return await _companyService.DeleteCompanyAsync(id);
        }

        [HttpPut("{id}/status")]
        public async Task<ApiResponse<bool>> UpdateCompanyStatus(int id, [FromBody] bool isActive)
        {
            return await _companyService.UpdateCompanyStatusAsync(id, isActive);
        }
    }
}