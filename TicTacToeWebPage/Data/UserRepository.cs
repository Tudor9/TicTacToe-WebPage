using System.Linq;
using TDtry.Model;

namespace TDtry.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;
        
        public UserRepository(UserDbContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges(); //return the ID of user just created

            return user;
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User DeleteUser(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();

            return user;
        }

        public User UpdateUserPassword(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();

            return user;
        }
    }
}