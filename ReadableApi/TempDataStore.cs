using ReadableApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi
{
    public class TempDataStore
    {
        public static TempDataStore Current { get; } = new TempDataStore();

        public List<Post> Posts { get; set; }

        public TempDataStore()
        {
            Posts = new List<Post>()
            {
                new Post()
                {
                    Author = "Gandalf",
                    Title = "There and Back Again",
                    Timestamp = DateTime.Now,
                    Body = "This is a long long story about a Hobbit...",
                    Category = "Fantasy",
                    VoteScore = 4000,
                    Deleted = false
                },
                new Post()
                {
                    Author = "Sam",
                    Title = "No More Volcanoes",
                    Timestamp = DateTime.Now,
                    Body = "I'm done dude, seriously. No more volcanoes.",
                    Category = "Fantasy",
                    VoteScore = 8420,
                    Deleted = false
                },
            };
        }
    }
}
