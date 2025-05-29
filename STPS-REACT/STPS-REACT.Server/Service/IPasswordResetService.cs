using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Service
{
    public interface IPasswordResetService
    {
        Task<ApiResponse<bool>> SendOtpAsync(ForgotPasswordRequest request);
        Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request);
        Task<ApiResponse<bool>> ResetPasswordAsync(ResetPasswordRequest request);
    }
}
