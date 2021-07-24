using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Shop.Models;

namespace Online_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ApplicationContext _db;

        public ProductController(ApplicationContext db)
        {
            _db = db;
        }
        
        // Get: api/product
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            
            if (User.Identity is {IsAuthenticated: false})
            {
                return _db.Products.ToList();
            }
            
            var userId = int.Parse(User.Claims.First(claim => claim.Type == "id").Value);
            
            var favProducts = _db.Products.Where(x => x.UsersFavorites.Any(y => y.Id == userId));
            var products = _db.Products.ToList();
            foreach (var product in favProducts)
            {
                products.First(x => x.Id == product.Id).Favorites = true;
            }
            
            return products.ToList();
            
        }

        // Get: api/product/id
        [HttpGet("{id:int}")]
        public Product Get(int id)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == id);
            return product;
        }

        // Post: api/product
        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Post(Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _db.Products.Add(product);
            _db.SaveChanges();
            return Ok(product);

        }

        // Put: api/product
        [HttpPut]
        [Authorize(Roles = "admin")]
        public IActionResult Put(Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _db.Products.Update(product);
            _db.SaveChanges();
            return Ok(product);
        }

        // Delete: api/product/id
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == id);
            if (product == null) return Ok(product);
            _db.Products.Remove(product);
            _db.SaveChanges();
            return Ok(product);
        }
        
        // Put: api/product/addFav
        [Route("addFav")]
        [HttpPut]
        [Authorize]
        public IActionResult AddFav(Product prod)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var user = _db.Users.FirstOrDefault(x => x.Id == userId);
            var product = _db.Products.FirstOrDefault(x => x.Id == prod.Id);
            user.FavoritesProduct.Add(product);
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user.FavoritesProduct);
        }

        // Put: api/product/removeFav
        [Route("removeFav")]
        [HttpPut]
        [Authorize]
        public IActionResult RemoveFav(Product prod)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var user = _db.Users.Include(x => x.FavoritesProduct).FirstOrDefault(s => s.Id == userId);
            var product = _db.Products.FirstOrDefault(x => x.Id == prod.Id);
            if (user == null || product == null) return Ok();
            user.FavoritesProduct.Remove(product);
            _db.SaveChanges();
            return Ok(user.FavoritesProduct);
        }
    }
}