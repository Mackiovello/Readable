using ReadableApi.Models;
using System.Collections.Generic;
using System.Linq;
using Starcounter.Core;
using System;
using AutoMapper;

namespace ReadableApi.DataAccessLayer
{
    public class PostRepository : IRepository<PostDto>
    {
        public PostRepository()
        {
            if (GetAll().FirstOrDefault() == null)
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

        public IEnumerable<PostDto> GetAll()
        {
            return Db.Transact(() =>
            {
                var posts = Db.SQL<Post>($"SELECT p FROM {typeof(Post)} p");
                return Mapper.Map<IEnumerable<PostDto>>(posts);
            });
        }

        public void Insert(PostDto entity)
        {
            throw new NotImplementedException();
        }

        public void Update(PostDto entity)
        {
            throw new NotImplementedException();
        }

        public PostDto GetById(ulong id)
        {
            return Db.Transact(() =>
            {
                var post = Db.SQL<Post>($"SELECT p FROM {typeof(Post)} p")
                    .FirstOrDefault(p => p.Id == id);

                return Mapper.Map<PostDto>(post);
            });
        }
    }
}
