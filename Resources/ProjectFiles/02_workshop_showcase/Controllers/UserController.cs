using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project.Models;
using project.Service;

namespace project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IBlogService _userService;

        public UserController(IBlogService _userService)
        {
            this._userService = _userService;
        }

        [HttpPost]
        [Route("login")]
        public Payload Login(UserViewModel user)
        {
            Payload res = _userService.Login(user);
            return res;
        }

        [HttpPost]
        [Route("register")]
        public Payload Register(User user)
        {
            Payload res = _userService.Create(user);
            return res;
        }
    }
}
