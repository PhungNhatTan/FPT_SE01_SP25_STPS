using Microsoft.AspNetCore.Mvc;

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
