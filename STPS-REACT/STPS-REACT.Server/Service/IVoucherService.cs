using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Dto.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service
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