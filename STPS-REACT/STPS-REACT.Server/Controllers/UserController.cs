using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BookTourContext _context;

        public UserController(BookTourContext context)
        {
            _context = context;
        }

        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<UserResponse>>> GetUserById(int id)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

                if (user == null)
                {
                    return NotFound(ApiResponse<UserResponse>.ErrorResponse("Người dùng không tồn tại"));
                }

                var response = new UserResponse
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    Phone = user.Phone,
                    Address = user.Address,
                    CreatedAt = user.CreatedAt,
                    LastLogin = user.LastLogin,
                    Roles = new List<RoleDto>() // Khởi tạo danh sách vai trò trống
                };

                return Ok(ApiResponse<UserResponse>.SuccessResponse(response));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUserById: {ex.Message}");
                return StatusCode(500, ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi lấy thông tin người dùng: {ex.Message}"));
            }
        }

        // GET: api/User/Current/{username}
        [HttpGet("Current/{username}")]
        public async Task<ActionResult<ApiResponse<UserResponse>>> GetCurrentUser(string username)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                {
                    return NotFound(ApiResponse<UserResponse>.ErrorResponse("Người dùng không tồn tại"));
                }

                var response = new UserResponse
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    Phone = user.Phone,
                    Address = user.Address,
                    CreatedAt = user.CreatedAt,
                    LastLogin = user.LastLogin,
                    Roles = new List<RoleDto>() // Khởi tạo danh sách vai trò trống
                };

                return Ok(ApiResponse<UserResponse>.SuccessResponse(response));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetCurrentUser: {ex.Message}");
                return StatusCode(500, ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi lấy thông tin người dùng: {ex.Message}"));
            }
        }

        // PUT: api/User/UpdateEmail/{id}
        [HttpPut("UpdateEmail/{id}")]
        public async Task<ActionResult<ApiResponse<UserResponse>>> UpdateUserEmail(int id, [FromBody] UpdateEmailRequest request)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

                if (user == null)
                {
                    return NotFound(ApiResponse<UserResponse>.ErrorResponse("Người dùng không tồn tại"));
                }

                user.Email = request.Email;
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var response = new UserResponse
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    Phone = user.Phone,
                    Address = user.Address,
                    CreatedAt = user.CreatedAt,
                    LastLogin = user.LastLogin,
                    Roles = new List<RoleDto>()
                };

                return Ok(ApiResponse<UserResponse>.SuccessResponse(response, "Cập nhật email thành công"));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateUserEmail: {ex.Message}");
                return StatusCode(500, ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi cập nhật email: {ex.Message}"));
            }
        }

        [HttpGet("{userId}/refund-summary")]
        public async Task<ActionResult<ApiResponse<object>>> GetUserRefundSummary(int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Người dùng không tồn tại"));
                }

                // Lấy tất cả refund requests của user
                var refundRequests = await _context.RefundRequests
                    .Include(rr => rr.Booking)
                    .ThenInclude(b => b.Tour)
                    .Where(rr => rr.Booking.UserId == userId)
                    .ToListAsync();

                var totalRefunded = refundRequests.Where(rr => rr.Status == "Completed").Sum(rr => rr.RefundAmount);
                var pendingRefunds = refundRequests.Where(rr => rr.Status == "Pending").Sum(rr => rr.RefundAmount);
                var totalRefundRequests = refundRequests.Count;
                var completedRefunds = refundRequests.Count(rr => rr.Status == "Completed");

                var recentRefunds = refundRequests
                    .OrderByDescending(rr => rr.RequestDate)
                    .Take(5)
                    .Select(rr => new
                    {
                        RefundRequestId = rr.RefundRequestId,
                        BookingId = rr.BookingId,
                        TourName = rr.Booking.Tour.TourName,
                        RefundAmount = rr.RefundAmount,
                        Status = rr.Status,
                        RequestDate = rr.RequestDate,
                        ProcessedDate = rr.ProcessedDate
                    })
                    .ToList();

                var summary = new
                {
                    TotalRefunded = totalRefunded,
                    PendingRefunds = pendingRefunds,
                    TotalRefundRequests = totalRefundRequests,
                    CompletedRefunds = completedRefunds,
                    RecentRefunds = recentRefunds
                };

                return Ok(ApiResponse<object>.SuccessResponse(summary));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse($"Lỗi server: {ex.Message}"));
            }
        }
    }

    public class UpdateEmailRequest
    {
        public string Email { get; set; }
    }
}
