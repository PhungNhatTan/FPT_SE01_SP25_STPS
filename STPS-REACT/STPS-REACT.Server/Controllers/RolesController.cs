using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly BookTourContext _context;

        public RolesController(BookTourContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<RoleDto>>>> GetRoles()
        {
            try
            {
                var roles = await _context.Roles.ToListAsync();
                var roleDtos = roles.Select(r => new RoleDto
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName
                }).ToList();

                return Ok(ApiResponse<List<RoleDto>>.SuccessResponse(roleDtos));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<RoleDto>>.ErrorResponse($"Lỗi khi lấy danh sách vai trò: {ex.Message}"));
            }
        }

        // GET: api/Roles/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<RoleDto>>> GetRoleById(int id)
        {
            try
            {
                var role = await _context.Roles.FindAsync(id);

                if (role == null)
                {
                    return NotFound(ApiResponse<RoleDto>.ErrorResponse("Vai trò không tồn tại"));
                }

                var roleDto = new RoleDto
                {
                    RoleId = role.RoleId,
                    RoleName = role.RoleName
                };

                return Ok(ApiResponse<RoleDto>.SuccessResponse(roleDto));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<RoleDto>.ErrorResponse($"Lỗi khi lấy thông tin vai trò: {ex.Message}"));
            }
        }
    }
}
