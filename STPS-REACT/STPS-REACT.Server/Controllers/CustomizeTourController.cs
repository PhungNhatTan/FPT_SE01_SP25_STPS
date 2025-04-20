using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Controllers
{
    public class CustomizeTourController : Controller
    {
        private readonly StpsContext _context;
        LocationDAO ld;

        public CustomizeTourController(StpsContext context, LocationDAO ld)
        {
            _context = context;
            this.ld = ld;
        }

        public IActionResult Index()
        {
            return View();
        }

        //[HttpPost("recommend")]
        //public  IActionResult Recommend([FromBody] RecommendationRequest request)
        //{
        //    List<LocationDTO> locs = ld.GetLocationByRegions(List < RegionDTO > regions);
        //}
    }
    public class RecommendationRequest
    {
        public double Budget { get; set; }
        public int ResultCount { get; set; }
    }
}
