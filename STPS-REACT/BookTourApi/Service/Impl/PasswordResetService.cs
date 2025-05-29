using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookTour.Service.Impl
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly BookTourContext _context;
        private readonly IEmailService _emailService;

        // Sử dụng ConcurrentDictionary để lưu trữ OTP tạm thời
        // Key: Email, Value: (OTP, ExpiryDate, IsUsed)
        private static readonly ConcurrentDictionary<string, (string OTP, DateTime ExpiryDate, bool IsUsed)> _otpStore
            = new ConcurrentDictionary<string, (string, DateTime, bool)>();

        public PasswordResetService(BookTourContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<ApiResponse<bool>> SendOtpAsync(ForgotPasswordRequest request)
        {
            try
            {
                // Kiểm tra email có tồn tại không
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                {
                    return ApiResponse<bool>.ErrorResponse("Email không tồn tại trong hệ thống");
                }

                // Tạo OTP ngẫu nhiên 6 chữ số
                string otp = GenerateOTP();

                // Lưu OTP vào bộ nhớ tạm thời với thời gian hết hạn là 10 phút
                _otpStore[request.Email] = (otp, DateTime.UtcNow.AddMinutes(10), false);

                // Gửi OTP qua email
                bool emailSent = await _emailService.SendPasswordResetOtpAsync(request.Email, otp);
                if (!emailSent)
                {
                    return ApiResponse<bool>.ErrorResponse("Không thể gửi email OTP");
                }

                return ApiResponse<bool>.SuccessResponse(true, "Mã OTP đã được gửi đến email của bạn");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi gửi OTP: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request)
        {
            try
            {
                // Kiểm tra OTP có tồn tại không
                if (!_otpStore.TryGetValue(request.Email, out var otpInfo))
                {
                    return ApiResponse<bool>.ErrorResponse("Mã OTP không hợp lệ hoặc đã hết hạn");
                }

                var (storedOtp, expiryDate, isUsed) = otpInfo;

                // Kiểm tra OTP có đúng không
                if (storedOtp != request.OTP)
                {
                    return ApiResponse<bool>.ErrorResponse("Mã OTP không chính xác");
                }

                // Kiểm tra OTP đã hết hạn chưa
                if (expiryDate < DateTime.UtcNow)
                {
                    return ApiResponse<bool>.ErrorResponse("Mã OTP đã hết hạn");
                }

                // Kiểm tra OTP đã được sử dụng chưa
                if (isUsed)
                {
                    return ApiResponse<bool>.ErrorResponse("Mã OTP đã được sử dụng");
                }

                return ApiResponse<bool>.SuccessResponse(true, "Mã OTP hợp lệ");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi xác thực OTP: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> ResetPasswordAsync(ResetPasswordRequest request)
        {
            try
            {
                // Kiểm tra OTP có hợp lệ không
                var verifyResult = await VerifyOtpAsync(new VerifyOtpRequest { Email = request.Email, OTP = request.OTP });
                if (!verifyResult.Success)
                {
                    return verifyResult;
                }

                // Cập nhật mật khẩu mới
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                {
                    return ApiResponse<bool>.ErrorResponse("Người dùng không tồn tại");
                }

                // Mã hóa mật khẩu mới
                user.Password = HashPassword(request.NewPassword);
                _context.Entry(user).State = EntityState.Modified;

                // Đánh dấu OTP đã sử dụng
                if (_otpStore.TryGetValue(request.Email, out var otpInfo))
                {
                    var (otp, expiryDate, _) = otpInfo;
                    _otpStore[request.Email] = (otp, expiryDate, true);
                }

                await _context.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResponse(true, "Đặt lại mật khẩu thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi đặt lại mật khẩu: {ex.Message}");
            }
        }

        private string GenerateOTP()
        {
            // Tạo OTP ngẫu nhiên 6 chữ số
            Random random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
