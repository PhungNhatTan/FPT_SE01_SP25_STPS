using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Service;
using BookTour.Dto.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherService _voucherService;
        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<VoucherResponse>>>> GetAll()
        {
            var response = await _voucherService.GetAllVouchersAsync();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<VoucherResponse>>> GetById(int id)
        {
            var response = await _voucherService.GetVoucherByIdAsync(id);
            if (!response.Success)
                return NotFound(response);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<VoucherResponse>>> Add([FromBody] CreateVoucherRequest request)
        {
            var response = await _voucherService.AddVoucherAsync(request);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<VoucherResponse>>> Update(int id, [FromBody] UpdateVoucherRequest request)
        {
            if (id != request.Id)
                return BadRequest(ApiResponse<VoucherResponse>.ErrorResponse("Id không kh?p"));
            var response = await _voucherService.UpdateVoucherAsync(request);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _voucherService.DeleteVoucherAsync(id);
            if (!response.Success)
                return NotFound(response);
            return Ok(response);
        }
    }
}