using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;

namespace STPS_REACT.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TctourListController : Controller
    {
        private readonly TcTourDAO _tctd;
 
        public TctourListController(TcTourDAO tctd)
        {
            _tctd = tctd;
        }

        [HttpGet("tctl")]
        public async Task<IActionResult> loadList()
        {
            var list = _tctd.GetListTctour();
            return Ok(list);
        }
    }
}
