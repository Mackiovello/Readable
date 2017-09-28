using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReadableApi.DatabaseAccess;
using ReadableApi.Models;
using Starcounter.Core;

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
            return Ok(_postsRetriever.GetFirst());
        }
    }
}
