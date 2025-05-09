using Microsoft.Identity.Client;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DAO
{
    public class AccountDAO{
        private readonly StpsContext _context;
        public AccountDAO(StpsContext context){
            _context=context;
        }
        public AccountDTO getLoginInfo(String username, String password){
            AccountDTO getA = (AccountDTO)_context.Accounts.Select(a=> new AccountDTO{
                AccountId=a.AccountId,
                Username=a.Username,
                Password=a.Password,
                AuId=a.AuId,
                Status=a.Status
            }).Where(b=> b.Username==username&&b.Password==password&&b.Status==true);
            return getA;
        }
        public AccountDTO getAccountInfo(String username){
            AccountDTO getA = (AccountDTO)_context.Accounts.Select(a=> new AccountDTO{
                AccountId=a.AccountId,
                Username=a.Username,
                Password=a.Password,
                AuId=a.AuId,
                Status=a.Status
            }).Where(b=> b.Username==username);
            return getA;
        }
    }
}