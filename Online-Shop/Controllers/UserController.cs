using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Shop.Models;

namespace Online_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        
        private readonly ApplicationContext _db;

        public UserController(ApplicationContext db)
        {
            _db = db;
        }

        // Get: /api/user
        [HttpGet]
        [Authorize]
        public User Get()
        {
            var id = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var user = _db.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }
        
        // Post: /api/user
        [HttpPost]
        public IActionResult Post(User user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (_db.Users.FirstOrDefault(x => x.Username == user.Username) != null)
                return BadRequest("Already registered");
            _db.Users.Add(user);
            _db.SaveChanges();
            return Ok(user);
        }

        // Put: /api/user
        [HttpPut]
        [Authorize]
        public IActionResult Put(User user)
        {
            if (user == null) return BadRequest(ModelState);
            _db.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }

        // Delete: /api/user
        [HttpDelete]
        [Authorize]
        public IActionResult Delete()
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == int.Parse(User.Claims.First(claim => claim.Type == "id").Value));
            if (user == null) return BadRequest();
            _db.Users.Remove(user);
            _db.SaveChanges();
            return Ok(user);
        }
    }
}