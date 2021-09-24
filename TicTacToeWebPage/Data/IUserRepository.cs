using System.Configuration;
using TDtry.Model;

namespace TDtry.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
        User DeleteUser(User user);
        User UpdateUserPassword(User user);
    }
}