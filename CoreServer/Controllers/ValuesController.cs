using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Starcounter.Core;
using Newtonsoft.Json;

namespace CoreServer
{
    [Route("posts")]
    public class ValuesController : Controller
    {
        // GET: posts
        [HttpGet]
        public string Get()
        {
            string postJson = null;

            Db.Transact(() =>
            {
                var posts = Db.SQL<Post>($"SELECT p FROM CoreServer.Post p");

                postJson = JsonConvert.SerializeObject(posts);
            });

            Response.ContentType = "application/json";
            return postJson ?? "There are no posts";
        }

        // GET posts/asdgv
        [HttpGet("{id}")]
        public string Get(string id)
        {
            return "value";
        }

        // POST posts
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT posts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE posts/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
