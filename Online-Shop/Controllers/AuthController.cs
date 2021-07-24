using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Online_Shop.Models;

namespace Online_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ApplicationContext _db;
        private readonly IConfiguration _config;

        public AuthController(ApplicationContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]Login request)
        {
            var user = AuthenticateUser(request.Username, request.Password);
            if (user == null) return Unauthorized();
            var tokenString = BuildToken(user);
            return Ok(new { access_token = tokenString });
        }

        private User AuthenticateUser(string username, string password)
        {
            return _db.Users.SingleOrDefault(x => x.Username == username && x.Password == password);
        }
        private string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]));
            var creeds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new("id", user.Id.ToString()),
                new(ClaimsIdentity.DefaultNameClaimType, user.Username),
                new(ClaimsIdentity.DefaultRoleClaimType, user.Role)

            };
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creeds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}