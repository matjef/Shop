using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Online_Shop.Models
{
    public sealed class ApplicationContext :DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            /*
            Database.EnsureDeleted();
            */
            Database.EnsureCreated();
            if (Products.Any() || Users.Any()) return;
            var product1 = new Product {
                Title = "Product 1", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_1.jpg",
                Price = 8.99
            };
            var product2 = new Product {
                Title = "Product 2", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_2.jpg",
                Price = 16.99
            };
            var product3 = new Product {
                Title = "Product 3", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_3.jpg",
                Price = 19.99
            };
            var product4 = new Product {
                Title = "Product 4", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_4.jpg",
                Price = 10.99
            };
            var product5 = new Product {
                Title = "Product 5", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_5.jpg",
                Price = 13.99
            };
            var product6 = new Product {
                Title = "Product 6", 
                Description = "Round neck sweater with long sleeves. Features a knotted opening in the front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non dolor id commodo.",
                Image = "/assets/images/product_6.jpg",
                Price = 7.99
            };
            Products.AddRange(product1, product2, product3, product4, product5, product6);

            var admin = new User {Username = "admin", Password = "admin", Role = "admin"};
            var user = new User {Username = "user", Password = "user", Role = "user"};
            Users.AddRange(admin, user);

            admin.FavoritesProduct.Add(product1);            
            admin.FavoritesProduct.Add(product3);
            
            user.FavoritesProduct.Add(product2);
            user.FavoritesProduct.Add(product6);
            
            SaveChanges();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        
    }
}