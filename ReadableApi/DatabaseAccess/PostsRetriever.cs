using ReadableApi.DatabaseAccess;
using ReadableApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.DatabaseAccess
{
    public class InMemoryPostsRetriever : IDatabaseReader<Post>
    {
        private List<Post> _posts;

        public InMemoryPostsRetriever()
        {
            _posts = new List<Post>()
            {
                new Post()
                {
                    Author = "Gandalf",
                    Title = "There and Back Again",
                    Timestamp = DateTime.Now,
                    Body = "This is a long long story about a Hobbit...",
                    Category = "Fantasy",
                    VoteScore = 4000,
                    Deleted = false,
                    Id = 1
                },
                new Post()
                {
                    Author = "Sam",
                    Title = "No More Volcanoes",
                    Timestamp = DateTime.Now,
                    Body = "I'm done dude, seriously. No more volcanoes.",
                    Category = "Fantasy",
                    VoteScore = 8420,
                    Deleted = false,
                    Id = 2
                },
            };
        }

        public Post GetFirst()
        {
            return _posts.FirstOrDefault();
        }

        public List<Post> GetAll()
        {
            return _posts;
        }

        public Post GetById(int id)
        {
            return _posts.Where(p => p.Id == id).FirstOrDefault();
        }
    }
}
