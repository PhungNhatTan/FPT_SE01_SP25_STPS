﻿using System;
using System.Collections.Generic;

namespace STPS_REACT.Server.Models;

public partial class AccountDetail
{
    public string AccountId { get; set; } = null!;

    public string? Email { get; set; }

    public string? Avatar { get; set; }

    public string? Name { get; set; }

    public virtual Account Account { get; set; } = null!;
}
