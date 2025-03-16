using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Account
{
    public string AccountId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public int AuId { get; set; }

    public string Password { get; set; } = null!;

    public bool Status { get; set; }

    public virtual Authentication Au { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<TourFeedback> TourFeedbacks { get; set; } = new List<TourFeedback>();

    public virtual ICollection<TourismCompany> TourismCompanies { get; set; } = new List<TourismCompany>();
}
