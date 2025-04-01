using Microsoft.AspNetCore.Mvc;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.DAO;

namespace STPS_REACT.Server.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
