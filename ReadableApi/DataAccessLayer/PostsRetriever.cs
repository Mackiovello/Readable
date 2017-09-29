using ReadableApi.Models;
using System.Collections.Generic;
using System.Linq;
using Starcounter.Core;
using System;
using AutoMapper;

namespace ReadableApi.DataAccessLayer
{
    public class InMemoryPostsRetriever : IDatabaseReader<PostDto>
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

        public PostDto GetFirst()
        {
            var post = Db.Transact(() => 
            {
                var firstPost = Db.SQL<Post>($"SELECT p FROM {typeof(Post)} p").FirstOrDefault();
                return Mapper.Map<PostDto>(firstPost);
            });

            return post;
        }

        public List<PostDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public PostDto GetById(ulong id)
        {
            throw new NotImplementedException();
        }
    }
}
