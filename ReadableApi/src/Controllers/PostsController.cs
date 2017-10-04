using Microsoft.AspNetCore.Mvc;
using ReadableApi.Models;
using System.Linq;

namespace ReadableApi.Controllers
{
    [Route("api/posts")]
    public class PostsController : Controller
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var posts = Post.GetAll();

            var dtos = posts.Select(p => p.ToDto());

            return Ok(dtos);
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(ulong id)
        {
            var post = Post.GetById(id);

            if (post.Any())
                return Ok(post);

            return NotFound();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Post post)
        {
            if (post == null)
                return BadRequest();

            return CreatedAtRoute(
                routeName: "GetById", 
                routeValues: new { id = post.Id },
                value: post);
        }
    }
}
