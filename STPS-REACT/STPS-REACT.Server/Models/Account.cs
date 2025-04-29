using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Account
{
    public string AccountId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public int AuId { get; set; }

    public string Password { get; set; } = null!;

    public bool Status { get; set; }

    public virtual Authentication Au { get; set; } = null!;

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();

    public virtual ICollection<TourismCompany> TourismCompanies { get; set; } = new List<TourismCompany>();
}
