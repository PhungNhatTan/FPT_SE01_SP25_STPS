using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;

namespace STPS_REACT.Server.Controllers
{
    public class TctourController : Controller
    {
        private readonly TcTourDAO _tctd;

        public TctourController(TcTourDAO tctd)
        {
            _tctd = tctd;
        }

        public async Task<IActionResult> load(String TctourId)
        {
            var res = _tctd.GetTctour(TctourId);
            return Ok(res);
        }
    }
}
