using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Starcounter.Core;
using Newtonsoft.Json;

namespace CoreServer
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            string postJson = null;

            Db.Transact(() =>
            {
                var posts = Db.SQL<Post>($"SELECT p FROM CoreServer.Post p");

                if (posts.FirstOrDefault() == null)
                {
                    var newPost = Db.Insert<Post>();
                    newPost.Title = "Test title";
                    newPost.Category = "MyCategory";
                    newPost.Body = "Body of post";
                    newPost.Author = "Author";
                    newPost.Inserted();
                }

                postJson = JsonConvert.SerializeObject(posts);
            });

            Response.ContentType = "application/json";
            return postJson ?? "There are no posts";
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
