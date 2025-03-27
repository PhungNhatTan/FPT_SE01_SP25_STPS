using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class Blog
{
    public string AccountId { get; set; } = null!;

    public string BlogId { get; set; } = null!;

    public string BlogName { get; set; } = null!;

    public string BlogContent { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;
}
