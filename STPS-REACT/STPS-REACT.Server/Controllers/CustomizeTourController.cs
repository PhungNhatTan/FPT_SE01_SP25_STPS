using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.DAO;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Utils;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    public class CustomizeTourController : Controller
    {
        private readonly StpsContext _context;
        LocationDAO _ld;
        RecommendLogic _rl;
        RegionDAO _rd;
        private IConfiguration _configuration;

        public CustomizeTourController(StpsContext context, LocationDAO ld, RecommendLogic rl, IConfiguration iconfig, RegionDAO rd)
        {
            _context = context;
            this._ld = ld;
            this._rl = rl;
            _configuration = iconfig;
            _rd = rd;
        }

        //recommend logic
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet("fetch")]
        public IActionResult CustomizeTour()
        {
            List<RegionDTO> region = _rd.getAll();
            List<LocationDTO> location = _ld.GeAllLocation();
            DisplayItems di = new DisplayItems(region, location);
            return Ok(di);
        }

        [HttpPost("recommend")]
        public IActionResult Recommend([FromBody] RecommendationRequest request)
        {
            List<String> regionIdList = new List<String>();
            this.Request.Form.Keys
                .Where(n => n.Equals("regionId"))
                .ToList()
                .ForEach(x => regionIdList.Add(Request.Form[x]));
            List<LocationDTO> locs = _ld.GetLocationByRegion(regionIdList);

            double budget = Double.Parse(Request.Form["budget"]);
            int numLocs = ((DateTime.Parse(Request.Form[key: "startD"]) - DateTime.Parse(Request.Form[key: "endD"])).Days + 1) * 2;
            locs = _rl.RecommendLoc(locs, budget);
            locs = _rl.RegionAdjustment2(locs, numLocs);

            string apiKey = "5b3ce3597851110001cf6248064210da58d64228a1fd3093591826ee";

            return Ok(RouteOpt(locs, apiKey));
        }

        //route planner
        public async Task<List<LocationDTO>> RouteOpt(List<LocationDTO> locs, string apiKey)
        {
            var httpClient = new HttpClient();
            var jobs = new List<object>();
            var steps = new List<LocationDTO>();

            for (int i = 0; i < locs.Count; i++)
            {
                var loc = locs[i];
                jobs.Add(new
                {
                    id = i + 1,
                    location = new[] { loc.lon, loc.lat },
                    service = 300
                });
            }

            var vehicles = new[]
            {
                new
                {
                    id = 1,
                    profile = "driving-car"
                }
            };

            var payload = new
            {
                job = jobs,
                vehicles = vehicles,
            };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openrouteservice.org/optimization");
            request.Headers.Add("Authorization", apiKey);
            request.Content=new StringContent(JsonSerializer.Serialize(payload), encoding: Encoding.UTF8,"application/json");

            var response=await httpClient.SendAsync(request);
            var result=await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Open route service API error: " + result);
            }

            var json=JsonDocument.Parse(result);
            var stepJson = json.RootElement
                .GetProperty("route")[0]
                .GetProperty("steps");

            foreach (var step in stepJson.EnumerateArray())
            {
                int jobId = step.GetProperty("job").GetInt32();
                if (jobId == 0) continue;

                var loc = locs[jobId - 1];
                steps.Add(loc);
            }
            return steps;
        }
    }
    public class RecommendationRequest
    {
        public double Budget { get; set; }
        public int ResultCount { get; set; }
    }

    class DisplayItems
    {
        public List<RegionDTO> _regions { get; set; } = null!;
        public List<LocationDTO> _locations { get; set; } = null!;
        public DisplayItems(List<RegionDTO> regions, List<LocationDTO> locations)
        {
            _regions = regions;
            _locations = locations;
        }
    }
}
