using Microsoft.AspNetCore.Mvc;
using ReadableApi.DataAccessLayer;
using ReadableApi.Models;

namespace ReadableApi.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private IDatabaseReader<PostDto> _postsRetriever;

        public PostsController(IDatabaseReader<PostDto> postsRetriever)
        {
            _postsRetriever = postsRetriever;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_postsRetriever.GetFirst());
        }
    }
}
