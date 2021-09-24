using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using project.Service;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace project.Helpers
{
    public class JwtMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly string _secret;

        public JwtMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _secret = config["JWT:Secret"];
        }

        /*
         * Since we assigned JwtMiddleware as our custom middleware in the Startup.cs file ie: app.UseMiddleware<JwtMiddleware>();,
         * this method gets called implicitly
        */
        public async Task Invoke(HttpContext context, IBlogService userService)
        {
            // parsing the jwt token from the header "Authorization"
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = Util.ValidateToken(token, _secret);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                // we can the access this context object in our controller classes
                context.Items["UserId"] = userService.GetById(userId).Id;
            }

            await _next(context);
        }
    }
}