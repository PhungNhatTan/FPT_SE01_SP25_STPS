using Microsoft.EntityFrameworkCore;
namespace WebApplication1.Utils
{
    public class Context : DbContext
    {
        public Context( DbContextOptions<Context> options) {}
    }
}
