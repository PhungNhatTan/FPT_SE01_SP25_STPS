using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Region
{
    public string RegionId { get; set; } = null!;

    public string RegionName { get; set; } = null!;

    public virtual ICollection<Location> Locations { get; set; } = new List<Location>();
}
