using ReadableApi.Models;
using System.Collections.Generic;
using System.Linq;
using Starcounter.Core;
using System;

namespace ReadableApi.DatabaseAccess
{
    public class InMemoryPostsRetriever : IDatabaseReader<Post>
    {
        public InMemoryPostsRetriever()
        {
            if (GetFirst() == null)
            {
                Db.Transact(() =>
                {
                    var firstPost = Db.Insert<Post>();
                    firstPost.Author = "Gandalf";
                    firstPost.Title = "There and Back Again";
                    firstPost.Body = "This is a long long story about a Hobbit...";
                    firstPost.Category = "Fantasy";

                    var secondPost = Db.Insert<Post>();
                    secondPost.Author = "Sam";
                    secondPost.Title = "No More Volcanoes";
                    secondPost.Body = "I'm done dude, seriously. No more volcanoes.";
                    secondPost.Category = "Fantasy";

                    return new List<Post>() { firstPost, secondPost };
                });
            }
        }

        public Post GetFirst()
        {
            var post = Db.Transact(
                () => Db.SQL<Post>($"SELECT p FROM {typeof(Post)} p")
                .FirstOrDefault()
            );

            return post;
        }

        public List<Post> GetAll()
        {
            throw new NotImplementedException();
        }

        public Post GetById(ulong id)
        {
            throw new NotImplementedException();
        }
    }
}
