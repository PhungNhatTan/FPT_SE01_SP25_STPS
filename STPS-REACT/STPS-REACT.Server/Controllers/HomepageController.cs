using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Controllers
{
    public class HomepageController : Controller
    {
        private readonly StpsContext _context;
        private readonly LocationDAO _ld;
        private readonly BlogDAO _bd;
        private readonly TcTourDAO _tctd;

        public HomepageController(StpsContext context, LocationDAO ld, BlogDAO bd, TcTourDAO tctd)
        {
            _context = context;
            _ld = ld;
            _bd = bd;
            _tctd = tctd;
        }

        public async Task<IActionResult> Load()
        {
            var loc = _ld.GetHomepageLocation();
            var bl = _bd.GetHomepageBlog();
            var t = _tctd.GetHomepageTour();
            var display = new LoadViewModel
            {
                Locations = loc,
                Blogs = bl,
                Tours=t
            };
            return Ok(display);
        }
    }

    class LoadViewModel
    {
        public List<BlogDTO>? Blogs { get; set; }
        public List<LocationDTO>? Locations { get; set; }
        public List<TcTourDTO>? Tours { get; set; }
    }
}
