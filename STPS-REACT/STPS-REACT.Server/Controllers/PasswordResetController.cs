using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;

        public PasswordResetController(IPasswordResetService passwordResetService)
        {
            _passwordResetService = passwordResetService;
        }

        [HttpPost("SendOtp")]
        public async Task<ActionResult<ApiResponse<bool>>> SendOtp([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                var response = await _passwordResetService.SendOtpAsync(request);
                if (response.Success)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<bool>.ErrorResponse($"Lỗi khi gửi OTP: {ex.Message}"));
            }
        }

        [HttpPost("VerifyOtp")]
        public async Task<ActionResult<ApiResponse<bool>>> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            try
            {
                var response = await _passwordResetService.VerifyOtpAsync(request);
                if (response.Success)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<bool>.ErrorResponse($"Lỗi khi xác thực OTP: {ex.Message}"));
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<ActionResult<ApiResponse<bool>>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            try
            {
                var response = await _passwordResetService.ResetPasswordAsync(request);
                if (response.Success)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<bool>.ErrorResponse($"Lỗi khi đặt lại mật khẩu: {ex.Message}"));
            }
        }
    }
}
