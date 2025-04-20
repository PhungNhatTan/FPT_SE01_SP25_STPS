using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Feedback
{
    public string FeedbackId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;

    public virtual TourFeedback? TourFeedback { get; set; }

    public virtual LocationFeedback? LocationFeedback { get; set; }
}
