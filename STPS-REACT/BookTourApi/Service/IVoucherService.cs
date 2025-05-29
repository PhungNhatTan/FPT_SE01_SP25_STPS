using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Dto.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface IVoucherService
    {
        Task<ApiResponse<List<VoucherResponse>>> GetAllVouchersAsync();
        Task<ApiResponse<VoucherResponse>> GetVoucherByIdAsync(int id);
        Task<ApiResponse<VoucherResponse>> AddVoucherAsync(CreateVoucherRequest request);
        Task<ApiResponse<VoucherResponse>> UpdateVoucherAsync(UpdateVoucherRequest request);
        Task<ApiResponse<bool>> DeleteVoucherAsync(int id);
    }
} 