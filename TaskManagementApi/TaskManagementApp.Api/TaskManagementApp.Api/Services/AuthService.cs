using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementApp.Api.Data;
using TaskManagementApp.Api.DTOs;
using TaskManagementApp.Api.Models;
using BCrypt.Net;

namespace TaskManagementApp.Api.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> Register(UserRegisterDto userDto)
        {
            var user = new ApplicationUser
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return "User registered successfully";
        }

        public async Task<string> Login(UserLoginDto userDto)
        {
            Console.WriteLine($"Login attempt for: {userDto.Username}");

            var user = _context.Users.FirstOrDefault(u => u.Username == userDto.Username);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return null;
            }

            bool passwordValid = BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash);
            Console.WriteLine($"Password valid: {passwordValid}");

            if (!passwordValid)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}
