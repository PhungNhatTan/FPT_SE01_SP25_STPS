using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class LocationFeedback
{
    public string FeedbackId { get; set; } = null!;

    public string LocationId { get; set; } = null!;

    public int Rating { get; set; }

    public virtual Location Location { get; set; } = null!;

}
