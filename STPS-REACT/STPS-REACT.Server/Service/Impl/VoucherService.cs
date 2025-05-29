using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service.Impl
{
    public class VoucherService : IVoucherService
    {
        private readonly IVoucherRepository _voucherRepository;
        public VoucherService(IVoucherRepository voucherRepository)
        {
            _voucherRepository = voucherRepository;
        }

        public async Task<ApiResponse<List<VoucherResponse>>> GetAllVouchersAsync()
        {
            var vouchers = await _voucherRepository.GetAllVouchersAsync();
            var result = vouchers.Select(MapToResponse).ToList();
            return ApiResponse<List<VoucherResponse>>.SuccessResponse(result);
        }

        public async Task<ApiResponse<VoucherResponse>> GetVoucherByIdAsync(int id)
        {
            var voucher = await _voucherRepository.GetVoucherByIdAsync(id);
            if (voucher == null)
                return ApiResponse<VoucherResponse>.ErrorResponse("Voucher không tồn tại");
            return ApiResponse<VoucherResponse>.SuccessResponse(MapToResponse(voucher));
        }

        public async Task<ApiResponse<VoucherResponse>> AddVoucherAsync(CreateVoucherRequest request)
        {
            var voucher = new Voucher
            {
                VoucherName = request.VoucherName,
                VoucherDetail = request.VoucherDetail,
                StartDate = request.StartDate,
                EndDate = request.EndDate
            };
            var created = await _voucherRepository.AddVoucherAsync(voucher);
            return ApiResponse<VoucherResponse>.SuccessResponse(MapToResponse(created), "Thêm voucher thành công");
        }

        public async Task<ApiResponse<VoucherResponse>> UpdateVoucherAsync(UpdateVoucherRequest request)
        {
            var voucher = await _voucherRepository.GetVoucherByIdAsync(request.Id);
            if (voucher == null)
                return ApiResponse<VoucherResponse>.ErrorResponse("Voucher không tồn tại");
            voucher.VoucherName = request.VoucherName;
            voucher.VoucherDetail = request.VoucherDetail;
            voucher.StartDate = request.StartDate;
            voucher.EndDate = request.EndDate;
            var updated = await _voucherRepository.UpdateVoucherAsync(voucher);
            return ApiResponse<VoucherResponse>.SuccessResponse(MapToResponse(updated), "Cập nhật voucher thành công");
        }

        public async Task<ApiResponse<bool>> DeleteVoucherAsync(int id)
        {
            var result = await _voucherRepository.DeleteVoucherAsync(id);
            if (!result)
                return ApiResponse<bool>.ErrorResponse("Voucher không tồn tại");
            return ApiResponse<bool>.SuccessResponse(true, "Xóa voucher thành công");
        }

        private VoucherResponse MapToResponse(Voucher v)
        {
            return new VoucherResponse
            {
                Id = v.Id,
                VoucherName = v.VoucherName,
                VoucherDetail = v.VoucherDetail,
                StartDate = v.StartDate,
                EndDate = v.EndDate
            };
        }
    }
} 