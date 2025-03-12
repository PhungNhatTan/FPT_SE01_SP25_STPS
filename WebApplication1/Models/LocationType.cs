using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class LocationType
{
    public string TypeId { get; set; } = null!;

    public string TypeName { get; set; } = null!;

    public virtual ICollection<Location> Locations { get; set; } = new List<Location>();
}
