using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Tour
{
    public string TourId { get; set; } = null!;

    public string? TourName { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<TourFeedback> TourFeedbacks { get; set; } = new List<TourFeedback>();
}
