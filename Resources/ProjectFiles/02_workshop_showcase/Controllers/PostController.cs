using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project.Models;
using project.Service;


namespace project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly string _userId;


        public PostController(IBlogService _blogService)
        {
            this._blogService = _blogService;
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];

        }

        // POST /post/auth/post
        [Authorize]
        [HttpPost]
        [Route("auth/post")]
        async public Task<ActionResult> Create([FromForm] Post post)
        {
            post.AuthorId = _userId;
            Payload res = await _blogService.CreatePost(post);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, res.StatusDescription));
            }
            return Ok(res);
        }


        [HttpGet]
        public ActionResult GetPosts()
        {

            List<Post> posts = _blogService.GetPosts();
            if (posts == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Invalid inputs", 400, "Something is wrong"));
            }
            return Ok(posts);
        }

        // get all user posts
        // GET /[post]/auth/posts
        [Authorize]
        [HttpGet]
        [Route("auth/posts")]
        public ActionResult GetUserPosts()
        {
            List<Post> posts = _blogService.GetPostsById(_userId);
            if (posts == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(posts);
        }

    }
}