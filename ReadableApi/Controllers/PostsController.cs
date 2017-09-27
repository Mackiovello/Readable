using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReadableApi.DatabaseAccess;
using ReadableApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReadableApi.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private IDatabaseReader<Post> _postsRetriever;

        public PostsController(IDatabaseReader<Post> postsRetriever)
        {
            _postsRetriever = postsRetriever;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_postsRetriever.GetAll());
        }
    }
}
