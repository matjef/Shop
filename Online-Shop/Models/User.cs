using System.Collections.Generic;

namespace Online_Shop.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public List<Product> FavoritesProduct { get; set; } = new List<Product>();

        public User()
        {
            this.Role = "user";
        }
    }
}