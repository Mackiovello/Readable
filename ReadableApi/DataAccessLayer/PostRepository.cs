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

        public PostDto Insert(PostDto post)
        {
            return Db.Transact(() =>
            {
                var newPost = Db.Insert<Post>();
                newPost.Author = post.Author;
                newPost.Body = post.Body;
                newPost.Category = post.Category;
                newPost.Title = post.Title;
                return Mapper.Map<PostDto>(newPost);
            });
        }

        public void Update(PostDto post)
        {
            Db.Transact(() =>
            {
                var updatedPost = Db.FromId<Post>(post.Id);
                updatedPost.Title = post.Title ?? updatedPost.Title;
                updatedPost.Author = post.Author ?? updatedPost.Author;
                updatedPost.Body = post.Body ?? updatedPost.Body;
                updatedPost.Category = post.Category ?? updatedPost.Category;
                updatedPost.VoteScore = post.VoteScore ?? updatedPost.VoteScore; 
            });
        }

        public PostDto GetById(ulong id)
        {
            return Db.Transact(() =>
            {
                return Mapper.Map<PostDto>(Db.FromId<Post>(id));
            });
        }
    }
}
