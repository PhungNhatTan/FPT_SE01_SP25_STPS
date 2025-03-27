using Microsoft.AspNetCore.Mvc;

namespace STPS_REACT.Server.Controllers
{
    public class HomepageController : Controller
    {
        public IActionResult Homepage()
        {
            return View();
        }
    }
}
