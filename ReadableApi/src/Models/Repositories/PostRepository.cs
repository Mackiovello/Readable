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
        private IPersister _persister;

        public PostRepository(IDatabase database, IMapper mapper, IPersister persister)
        {
            _db = database;
            _mapper = mapper;
            _persister = persister;

            CreateDummyDataIfNoData();
        }

        private void CreateDummyDataIfNoData()
        {
            if (GetAll().FirstOrDefault() == null)
            {
                _persister.MakePersistent<PersistentPost, InMemoryPost>(new InMemoryPost
                {
                    Author = "Gandalf",
                    Title = "There and Back Again",
                    Body = "This is a long long story about a Hobbit...",
                    Category = "Fantasy",
                });

                _persister.MakePersistent<PersistentPost, InMemoryPost>(new InMemoryPost
                {
                    Author = "Sam",
                    Title = "No More Volcanoes",
                    Body = "I'm done dude, seriously. No more volcanoes.",
                    Category = "Fantasy"
                });
            }
        }

        public IEnumerable<PostDto> GetAll()
        {
            return _db.Transact(() =>
            {
                var posts = _db.SQL<PersistentPost>($"SELECT p FROM {typeof(PersistentPost)} p");
                return _mapper.Map<IEnumerable<PersistentPost>, IEnumerable<PostDto>>(posts);
            });
        }

        public PostDto Insert(PostDto post)
        {
            _persister.MakePersistent<PersistentPost, PostDto>(post);

            return post;
        }

        public bool TryUpdate(PostDto post, ulong id)
        {
            return _db.Transact(() =>
            {
                var updatedPost = _db.FromId<PersistentPost>(id);

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
                return _mapper.Map<PersistentPost, PostDto>(_db.FromId<PersistentPost>(id));
            });
        }
    }
}
