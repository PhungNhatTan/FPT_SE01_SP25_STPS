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
        public List<LocationDTO> GeAllLocation() 
        { 
            using(var context = new StpsContext())
            {
                return _context.Locations
                    .Include(fb=>fb.LocationFeedback)
                    .GroupBy(a=>new {a.LocationId,a. TypeId,a.Price,a.Lat,a.Long,a.RegionId,a.Address,a.Type,a.LocationName,a.ImgUrl,a.Region})
                    .Select(l=>new LocationDTO
                {
                    LocationId=l.Key.LocationId,
                    LocationName = l.Key.LocationName,
                    TypeId= l.Key.TypeId,
                    TypeName=l.Key.Type.TypeName,
                    Price=l.Key.Price,
                    lat=l.Key.Lat,
                    lon=l.Key.Long,
                    imgUrl=l.Key.ImgUrl,
                    regionId=l.Key.RegionId,
                    Address=l.Key.Address,
                    Rating= l.Average(a=>a.LocationFeedback.Average(lf=>lf.Rating))
                }).ToList();
            }
        }
    }
}
