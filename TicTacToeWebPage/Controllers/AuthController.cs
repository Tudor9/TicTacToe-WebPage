using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TDtry.Data;
using TDtry.Dtos;
using TDtry.Helpers;
using TDtry.Model;

namespace TDtry.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password
            };
            return Created("Success", _repository.Create(user));
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new {message = "Invalid email."});

            if (dto.Password != user.Password) return BadRequest(new {message = "Invalid password."});

            var jwt = _jwtService.Generate(user.Id);
            
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "Success"
            });
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                var userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);
                
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpDelete("DeleteUser")]
        public IActionResult DeleteUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                
                var token = _jwtService.Verify(jwt);
                
                var userId = int.Parse(token.Issuer);
                
                var user = _repository.GetById(userId);
                
                Response.Cookies.Delete("jwt");
                _repository.DeleteUser(user);
                
                return Ok(new
                {
                    message = "Account successfully deleted!"
                });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
        
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            try
            {
                var unused = Request.Cookies["jwt"];
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    message = "Not logged in."
                });
            }
            
            Response.Cookies.Delete("jwt");
            
            return Ok(new
            {
                message = "Logged out successfully"
            });
        }

        [HttpPatch("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordDto dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                
                var token = _jwtService.Verify(jwt);
                
                var userId = int.Parse(token.Issuer);
                
                var user = _repository.GetById(userId);

                user.Password = dto.Password;

                var returnedUser = _repository.UpdateUserPassword(user);
                
                return Ok(returnedUser);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}