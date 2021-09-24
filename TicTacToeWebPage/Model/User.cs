using Newtonsoft.Json;

namespace TDtry.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        [JsonIgnore] public string Password { get; set; }
        public string Email { get; set; }
    }
}
