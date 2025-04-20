using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Receipt
{
    public string ReceiptId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string? TourId { get; set; }

    public string? LocationId { get; set; }

    public double Amount { get; set; }

    public DateOnly Date { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Location? Location { get; set; }

    public virtual Tour? Tour { get; set; }
}
