using ReadableApi.Models;
using System.Collections.Generic;
using System.Linq;
using ReadableApi.Models.Data;
using AutoMapper;

namespace ReadableApi.Models
{
    public class PostRepository : IRepository<PostDto>
    {
        private IDatabase _db;
        private IMapper _mapper;

        public PostRepository(IDatabase database, IMapper mapper)
        {
            _db = database;
            _mapper = mapper;

            CreateDummyDataIfNoData();
        }

        private void CreateDummyDataIfNoData()
        {
            if (GetAll().FirstOrDefault() == null)
            {
                _db.Transact(() =>
                {
                    var firstPost = _db.Insert<Post>();
                    firstPost.Author = "Gandalf";
                    firstPost.Title = "There and Back Again";
                    firstPost.Body = "This is a long long story about a Hobbit...";
                    firstPost.Category = "Fantasy";

                    var secondPost = _db.Insert<Post>();
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
            return _db.Transact(() =>
            {
                var posts = _db.SQL<Post>($"SELECT p FROM {typeof(Post)} p");
                return _mapper.Map<IEnumerable<Post>, IEnumerable<PostDto>>(posts);
            });
        }

        public PostDto Insert(PostDto post)
        {
            return _db.Transact(() =>
            {
                var newPost = _db.Insert<Post>();
                newPost.Author = post.Author;
                newPost.Body = post.Body;
                newPost.Category = post.Category;
                newPost.Title = post.Title;
                return _mapper.Map<Post, PostDto>(newPost);
            });
        }

        public bool TryUpdate(PostDto post, ulong id)
        {
            return _db.Transact(() =>
            {
                var updatedPost = _db.FromId<Post>(id);

                if (updatedPost == null)
                    return false;

                updatedPost.Title = post.Title ?? updatedPost.Title;
                updatedPost.Author = post.Author ?? updatedPost.Author;
                updatedPost.Body = post.Body ?? updatedPost.Body;
                updatedPost.Category = post.Category ?? updatedPost.Category;
                updatedPost.VoteScore = post.VoteScore ?? updatedPost.VoteScore;

                return true;
            });
        }

        public PostDto GetById(ulong id)
        {
            return _db.Transact(() =>
            {
                return _mapper.Map<Post, PostDto>(_db.FromId<Post>(id));
            });
        }
    }
}
