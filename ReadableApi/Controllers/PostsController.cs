using Microsoft.AspNetCore.Mvc;
using ReadableApi.DataAccessLayer;
using ReadableApi.Models;

namespace ReadableApi.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private IRepository<PostDto> _postsRepository;

        public PostsController(IRepository<PostDto> postsRepository)
        {
            _postsRepository = postsRepository;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_postsRepository.GetAll());
        }
    }
}
