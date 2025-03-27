using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Location
{
    public string LocationId { get; set; } = null!;

    public string TypeId { get; set; } = null!;

    public string LocationName { get; set; } = null!;

    public double? Price { get; set; }

    public string? ImgUrl { get; set; }

    public virtual LocationType Type { get; set; } = null!;
}
