using Microsoft.AspNetCore.Mvc;
using ReadableApi.DataAccessLayer;
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
            return Ok(_postsRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Create([FromBody] PostDto post)
        {
            PostDto newPost = _postsRepository.Insert(post);

            return CreatedAtRoute(
                routeName: "GetById", 
                routeValues: new { id = newPost.Id },
                value: newPost);
        }
    }
}
