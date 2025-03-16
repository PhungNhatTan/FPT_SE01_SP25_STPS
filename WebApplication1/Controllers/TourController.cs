using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class TourController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


    }
}
