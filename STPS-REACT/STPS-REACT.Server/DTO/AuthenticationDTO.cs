namespace STPS_REACT.Server.DTO
{
    public class AuthenticationDTO
    {
        public required int AuthenticationId { get; set; }

        public string? AuthenticationName { get; set; }

        public virtual ICollection<Models.Account>? Accounts { get; set; }
    }
}
