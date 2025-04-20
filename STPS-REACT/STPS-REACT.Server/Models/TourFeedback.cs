using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class TourFeedback
{
    public string FeedbackId { get; set; } = null!;

    public string TourId { get; set; } = null!;

    public int Rating { get; set; }

    public string? FeedbackDetail { get; set; }

    public DateOnly Date { get; set; }

    public virtual Feedback Feedback { get; set; } = null!;
}
