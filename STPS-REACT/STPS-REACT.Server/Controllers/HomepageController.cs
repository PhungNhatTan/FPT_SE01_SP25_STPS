using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Controllers
{
    public class HomepageController : Controller
    {
        private readonly StpsContext _context;
        private readonly LocationDAO _ld;
        private readonly BlogDAO _bd;
        private readonly TcTourDAO _tcd;

        public HomepageController(StpsContext context, LocationDAO ld, BlogDAO bd, TcTourDAO tcd)
        {
            _context = context;
            _ld = ld;
            _bd = bd;
            _tcd = tcd;
        }

        public IActionResult Homepage()
        {
            LocationLoad();
            BlogLoad();
            return View();
        }

        public async Task<IActionResult> LocationLoad()
        {
            var data = _ld.GetHomepageLocation();
            return Ok(data);
        }

        public async Task<IActionResult> BlogLoad()
        {
            var data = _bd.GetHomepageBlog();
            return Ok(data);
        }

        public async Task<IActionResult> TourLoad()
        {
            var data = _tcd.GetHomepageTour();
            return Ok(data);
        }
    }
}
