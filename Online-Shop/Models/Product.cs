using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Online_Shop.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public bool Favorites { get; set; }
        [JsonIgnore] public List<User> UsersFavorites { get; set; } = new List<User>();
        
        
    }
}