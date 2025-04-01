using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string TourId { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public bool Status { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Tour Tour { get; set; } = null!;
}
