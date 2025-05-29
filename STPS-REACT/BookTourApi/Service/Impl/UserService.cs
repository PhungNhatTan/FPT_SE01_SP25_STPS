using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookTour.Service.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly BookTourContext _context;

        public UserService(IUserRepository userRepository, BookTourContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        public async Task<ApiResponse<List<UserResponse>>> GetAllUsersAsync()
        {
            try
            {
                var users = await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToListAsync();
                var response = users.Select(MapToUserResponse).ToList();
                return ApiResponse<List<UserResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<UserResponse>>.ErrorResponse($"Lỗi khi lấy danh sách người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UserResponse>> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.UserId == id);
                if (user == null)
                {
                    return ApiResponse<UserResponse>.ErrorResponse("Người dùng không tồn tại");
                }
                var response = MapToUserResponse(user);
                return ApiResponse<UserResponse>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi lấy thông tin người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UserResponse>> CreateUserAsync(CreateUserRequest request)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByUsernameAsync(request.Username);
                if (existingUser != null)
                {
                    return ApiResponse<UserResponse>.ErrorResponse("Tên đăng nhập đã tồn tại");
                }
                // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
                var hashedPassword = HashPassword(request.Password);

                var user = new User
                {
                    Username = request.Username,
                    Password = hashedPassword,
                    Email = request.Email,
                    FullName = request.FullName,
                    Phone = request.Phone,
                    Address = request.Address,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                // Gán role
                if (request.RoleIds != null && request.RoleIds.Count > 0)
                {
                    foreach (var roleId in request.RoleIds)
                    {
                        _context.UserRoles.Add(new UserRole { UserId = user.UserId, RoleId = roleId });
                    }
                    await _context.SaveChangesAsync();
                }
                // Lấy lại user kèm role
                var userWithRoles = await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.UserId == user.UserId);
                var response = MapToUserResponse(userWithRoles);
                return ApiResponse<UserResponse>.SuccessResponse(response, "Tạo người dùng thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi tạo người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UserResponse>> UpdateUserAsync(UpdateUserRequest request)
        {
            try
            {
                var user = await _context.Users.Include(u => u.UserRoles).FirstOrDefaultAsync(u => u.UserId == request.UserId);
                if (user == null)
                {
                    return ApiResponse<UserResponse>.ErrorResponse("Người dùng không tồn tại");
                }
                user.Email = request.Email;
                user.FullName = request.FullName;
                user.Phone = request.Phone;
                user.Address = request.Address;

                // Nếu có cập nhật mật khẩu
                if (!string.IsNullOrEmpty(request.Password))
                {
                    user.Password = HashPassword(request.Password);
                }
                await _context.SaveChangesAsync();
                // Cập nhật lại role
                if (request.RoleIds != null)
                {
                    // Xóa role cũ
                    var oldRoles = _context.UserRoles.Where(ur => ur.UserId == user.UserId);
                    _context.UserRoles.RemoveRange(oldRoles);
                    // Thêm role mới
                    foreach (var roleId in request.RoleIds)
                    {
                        _context.UserRoles.Add(new UserRole { UserId = user.UserId, RoleId = roleId });
                    }
                    await _context.SaveChangesAsync();
                }
                // Lấy lại user kèm role
                var userWithRoles = await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.UserId == user.UserId);
                var response = MapToUserResponse(userWithRoles);
                return ApiResponse<UserResponse>.SuccessResponse(response, "Cập nhật người dùng thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<UserResponse>.ErrorResponse($"Lỗi khi cập nhật người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteUserAsync(int id)
        {
            try
            {
                var user = await _context.Users.Include(u => u.UserRoles).FirstOrDefaultAsync(u => u.UserId == id);
                if (user == null)
                {
                    return ApiResponse<bool>.ErrorResponse("Người dùng không tồn tại");
                }
                // Xóa UserRole
                var userRoles = _context.UserRoles.Where(ur => ur.UserId == id);
                _context.UserRoles.RemoveRange(userRoles);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResponse(true, "Xóa người dùng thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi xóa người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> UpdateUserStatusAsync(int id, bool isActive)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                if (user == null)
                {
                    return ApiResponse<bool>.ErrorResponse("Người dùng không tồn tại");
                }
                await _userRepository.UpdateUserAsync(user);
                return ApiResponse<bool>.SuccessResponse(true, "Cập nhật trạng thái người dùng thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi cập nhật trạng thái người dùng: {ex.Message}");
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private UserResponse MapToUserResponse(User user)
        {
            return new UserResponse
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName,
                Phone = user.Phone,
                Address = user.Address,
                CreatedAt = user.CreatedAt,
                LastLogin = user.LastLogin,
                Roles = user.UserRoles?.Select(ur => new RoleDto
                {
                    RoleId = ur.RoleId,
                    RoleName = ur.Role?.RoleName
                }).ToList() ?? new List<RoleDto>()
            };
        }
    }
}