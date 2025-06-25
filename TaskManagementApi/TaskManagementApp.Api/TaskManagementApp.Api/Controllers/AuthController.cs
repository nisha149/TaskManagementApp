using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagementApp.Api.DTOs;
using TaskManagementApp.Api.Services;

namespace TaskManagementApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            var result = await _authService.Register(userDto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            var token = await _authService.Login(userDto);
            if (token == null)
                return Unauthorized("Invalid credentials");
            return Ok(new { Token = token });
        }
        // New Authorize endpoint
        [Authorize]
        [HttpGet("authorize")]
        public IActionResult Authorize()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(username))
            {
                return Unauthorized("Invalid token");
            }

            return Ok(new
            {
                UserId = int.Parse(userId),
                Username = username,
                Message = "User is authorized"
            });
        }
    }
}