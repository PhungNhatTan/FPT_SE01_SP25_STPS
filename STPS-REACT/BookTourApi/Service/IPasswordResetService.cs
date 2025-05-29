using BookTour.Dto.Common;
using BookTour.Dto.Request;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface IPasswordResetService
    {
        Task<ApiResponse<bool>> SendOtpAsync(ForgotPasswordRequest request);
        Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request);
        Task<ApiResponse<bool>> ResetPasswordAsync(ResetPasswordRequest request);
    }
}
