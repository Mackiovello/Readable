using Microsoft.AspNetCore.Mvc;
using ReadableApi.Models;
using ReadableApi.Models.Data;

namespace ReadableApi.Controllers
{
    [Route("api/posts")]
    public class PostsController : Controller
    {
        private IRepository<InMemoryPost> _postsRepository;

        public PostsController(IRepository<InMemoryPost> postsRepository)
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
        public IActionResult Create([FromBody] InMemoryPost post)
        {
            if (post == null)
                return BadRequest();

            InMemoryPost newPost = _postsRepository.Insert(post);

            return CreatedAtRoute(
                routeName: "GetById", 
                routeValues: new { id = newPost.Id },
                value: newPost);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] InMemoryPost post, ulong id)
        {
            if (post == null)
                return BadRequest();

            if (_postsRepository.GetById(id) == null)
                return NotFound();

            _postsRepository.Update(post, id);
            return NoContent();
        }
    }
}
