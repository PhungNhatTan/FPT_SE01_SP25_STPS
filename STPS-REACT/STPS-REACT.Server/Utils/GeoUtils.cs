using STPS_REACT.Server.DTO;

namespace STPS_REACT.Server.Utils
{
    public class GeoUtils
    {
        public double CalculateDistanceKm(double lat1, double lon1, double? lat2, double? lon2)
        {
            const double R = 6371.0; // Earth radius in kilometers
            double dLat = ToRadians(lat2??lat1 - lat1);
            double dLon = ToRadians(lon2??lon1 - lon1);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2??lat1)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }
        public double ToRadians(double angle) => angle * Math.PI / 180.0;
    }
}
