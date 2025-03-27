using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class PersonalizedTour
{
    public string TourId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;

    public virtual Tour Tour { get; set; } = null!;
}
