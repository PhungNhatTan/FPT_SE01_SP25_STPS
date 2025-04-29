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

    public string RegionId { get; set; } = null!;

    public double? Long { get; set; }

    public double? Lat { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();

    public virtual ICollection<Region> Region { get; set; } = null!;

    public virtual LocationType Type { get; set; } = null!;

    public virtual ICollection<LocationFeedback> LocationFeedback { get; set; } = new List<LocationFeedback>();
}
