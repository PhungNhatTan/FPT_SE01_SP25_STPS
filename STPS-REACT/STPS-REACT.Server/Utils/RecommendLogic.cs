using STPS_REACT.Server.DTO;
using System.Security.Cryptography.Xml;

namespace STPS_REACT.Server.Utils
{
    // scoring location list
    public class RecommendLogic
    {
        protected double weightPrice = 0.25;
        protected double weightRating = 0.4;
        private GeoUtils gu = new GeoUtils();
        public List<LocationDTO> RecommendLoc(List<LocationDTO> locs, double anchorLat, double anchorLon, double budget, int maxTime, double maxDistance)
        {
            foreach (var loc in locs)
            {
                double priceScore = 1 - Math.Min(loc.Price ?? 0 / budget, 1);
                double ratingScore = loc.Rating ?? 0 / 5;
                loc.Score = priceScore * weightPrice + ratingScore * weightRating;
            }
            return locs.OrderByDescending(p => p.Score).ToList();
        }

        //re-ordering location list for region (hard penalty)
        public List<LocationDTO> RegionAdjustment1(List<LocationDTO> locs, int counter)
        {
            var regAppearance = new Dictionary<String, int>();
            var selected = new List<LocationDTO>();
            var remaining = new List<LocationDTO>(locs.OrderByDescending(p => p.Score));

            while (selected.Count < counter && remaining.Count > 0)
            {
                LocationDTO best = null;
                double bestAdjustedScore = double.MinValue;

                foreach (var loc in remaining)
                {
                    int penalties = 0;
                    if (loc.regionId != null)
                    {
                        foreach (var reg in loc.regionId)
                        {
                            regAppearance.TryGetValue(Char.ToString(reg), out int usage);
                            penalties += usage;
                        }
                    }

                    double score = loc.Score ?? 0 - 0.1 * penalties;

                    if (score > bestAdjustedScore)
                    {
                        best = loc;
                        bestAdjustedScore = score;
                    }
                }

                if (best != null)
                {
                    selected.Add(best);
                    remaining.Remove(best);

                    if (best.regionId != null)
                    {
                        foreach (var reg in best.regionId)
                        {
                            String regS = Char.ToString(reg);
                            if (regAppearance.ContainsKey(regS)) regAppearance[regS]++;
                            else regAppearance[regS] = 1;
                        }
                    }
                }
            }
            return selected;
        }

        //re-ordering location list for region (round robin)
        public List<LocationDTO> RegionAdjustment2(List<LocationDTO> locs, int counter)
        {
            var regAppearance = new HashSet<string>();
            var selected = new List<LocationDTO>();
            var remaining = new List<LocationDTO>(locs.OrderByDescending(p => p.Score));

            // get all regionID
            var allReg = locs
                .Where(p => !string.IsNullOrEmpty(p.regionId))
                .Select(p => p.regionId)
                .Distinct()
                .ToHashSet();

            while (selected.Count < counter && remaining.Count > 0)
            {
                LocationDTO best = null;

                foreach (var loc in remaining)
                {
                    if (regAppearance.Contains(loc.regionId)) continue;
                    best = loc;
                    break;
                }

                if (best == null)
                {
                    regAppearance.Clear();
                    continue;
                }

                selected.Add(best);
                remaining.Remove(best);
                regAppearance.Add(best.regionId);
            }
            return selected;
        }
    }
}
