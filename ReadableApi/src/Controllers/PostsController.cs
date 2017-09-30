using Microsoft.AspNetCore.Mvc;
using ReadableApi.Models;

namespace ReadableApi.Controllers
{
    [Route("api/posts")]
    public class PostsController : Controller
    {
        private IRepository<PostDto> _postsRepository;

        public PostsController(IRepository<PostDto> postsRepository)
        {
            _postsRepository = postsRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postsRepository.GetAll());
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(ulong id)
        {
            var post = _postsRepository.GetById(id);

            if (post == null)
                return NotFound();

            return Ok(post);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PostDto post)
        {
            if (post == null)
                return BadRequest();

            PostDto newPost = _postsRepository.Insert(post);

            return CreatedAtRoute(
                routeName: "GetById", 
                routeValues: new { id = newPost.Id },
                value: newPost);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] PostDto post, ulong id)
        {
            if (post == null)
                return BadRequest();

            if (_postsRepository.TryUpdate(post, id))
                return NoContent();

            return NotFound();
        }
    }
}
