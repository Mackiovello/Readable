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

            var dtos = posts.Select(p => p.Dto);

            return Ok(dtos);
        }

        [HttpPost("create")]
        public IActionResult CreateFirst()
        {
            new Post()
            {
                Author = "Someone",
                Title = "Something Happened",
                Category = "Fantasy",
                Body = "Some text"
            };

            return NoContent();
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(ulong id)
        {
            var post = Post.GetById(id).Dto;

            if (post == null)
                return NotFound();

            return Ok(post);
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

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Post post, ulong id)
        {
            if (post == null)
                return BadRequest();

            if (Post.GetById(id) == null)
                return NotFound();

            //_postsRepository.Update(post, id);
            return NoContent();
        }
    }
}
