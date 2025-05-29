using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BookTourContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(BookTourContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == registerDto.Email);

            if (existingUser != null)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Email đã tồn tại"));
            }
            var hashedPassword = HashPassword(registerDto.Password);

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                Password = hashedPassword,
                Address =  "Default Address",
                Phone ="null"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var role = _context.Roles.FirstOrDefault(r => r.RoleName == "User");
            if (role != null)
            {
                var userRole = new UserRole { UserId = user.UserId, RoleId = role.RoleId };
                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();
            }

            return Ok(ApiResponse<object>.SuccessResponse(null, "Đăng ký thành công"));
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _context.Users
     .Include(u => u.UserRoles)
     .ThenInclude(ur => ur.Role)
     .FirstOrDefault(u => u.Email == loginDto.Email);

            if (user == null || !VerifyPassword(loginDto.Password, user.Password))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Email hoặc mật khẩu không đúng"));
            }

            var token = GenerateJwtToken(user);
            var roles = user.UserRoles.Select(ur => ur.Role.RoleName).ToList();
            return Ok(new
            {
                token,
                roles,
                userId = user.UserId,
                username = user.Username,
                email = user.Email
            });
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashBytes);
            }
        }
        private bool VerifyPassword(string inputPassword, string storedPasswordHash)
        {
            var inputPasswordHash = HashPassword(inputPassword);
            return inputPasswordHash == storedPasswordHash;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email),
    };

            // Check if the user has roles
            if (user.UserRoles != null)
            {
                foreach (var userRole in user.UserRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole.Role.RoleName));
                }
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}