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

        // GET /[post]/posts
        [HttpGet]
        [Route("posts")]
        public ActionResult GetPosts()
        {

            List<Post> posts = _blogService.GetPosts();
            if (posts == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Invalid inputs", 400, "Something is wrong"));
            }
            return Ok(posts);
        }

        // GET /[post]/:id
        [HttpGet]
        [Route("{id}")]
        async public Task<ActionResult> GetPostById(string id)
        {

            Post post = await _blogService.GetPostById(id);
            if (post == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(post);
        }

        // GET /[post]?category=:category
        [HttpGet]
        public ActionResult GetPostByCategory(string category)
        {

            List<Post> posts = _blogService.GetPostsByCategory(category);
            if (posts == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
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

        // get a particular user post
        // GET /[post]/auth/:id
        [Authorize]
        [HttpGet]
        [Route("auth/{id}")]
        public ActionResult GetUserPostById(string id)
        {

            Console.WriteLine(id);
            Post post = _blogService.GetUserPostById(id);
            if (post == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(post);
        }


        // POST /[post]/auth
        [Authorize]
        [HttpPost]
        [Route("auth")]
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

        // POST /[post]/auth/edit
        [Authorize]
        [HttpPost]
        [Route("auth/edit")]
        async public Task<ActionResult> EditPost([FromForm] Post post)
        {
            Payload res = await _blogService.EditPost(post);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, res.StatusDescription));
            }
            return Ok(res);
        }


        // DELETE /[post]/auth
        [Authorize]
        [HttpDelete]
        [Route("auth")]
        public ActionResult DeletePost([FromForm] string id)
        {
            Payload res = _blogService.DeletePost(id);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, res.StatusDescription));
            }
            return Ok(res);
        }



    }
}