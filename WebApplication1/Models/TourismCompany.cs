using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class TourismCompany
{
    public string TcId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string TcName { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;
}
