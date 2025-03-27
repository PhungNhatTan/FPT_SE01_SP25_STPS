using Microsoft.EntityFrameworkCore;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;
using System.Data;
using System.Linq;

namespace STPS_REACT.Server.DAO
{
    public class LocationDAO
    {
        private readonly StpsContext _context;
        public LocationDAO(StpsContext context)
        {
            _context = context;
        }
        public List<LocationDTO> GetHomepageLocation()
        {
            using (var context = new StpsContext())
            {
                
                return _context.Locations.Select(l => new LocationDTO
                {
                    LocationId = l.LocationId,
                    TypeName = l.Type.TypeName
                }).OrderBy(r => Guid.NewGuid()).Take(5).ToList();
            }
        }
    }
}
