using System.Collections.Generic;
using System.Linq;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;

namespace ReadableApi.Models
{
    public class PostRepository : IRepository<InMemoryPost>
    {
        private IPersister _persister;
        private IDbReader<InMemoryPost> _dbReader;

        public PostRepository(IPersister persister, IDbReader<InMemoryPost> dbReader)
        {
            _persister = persister;
            _dbReader = dbReader;

            CreateDummyDataIfNoData();
        }

        public IEnumerable<InMemoryPost> GetAll() => _dbReader.All();

        public InMemoryPost Insert(InMemoryPost post)
        {
            _persister.MakePersistent<PersistentPost, InMemoryPost>(post);

            return post;
        }

        public void Update(InMemoryPost post, ulong id)
        {
            _persister.PersistentUpdate<PersistentPost, InMemoryPost>(post, id);
        }

        public InMemoryPost GetById(ulong id) => _dbReader.ById(id);

        private void CreateDummyDataIfNoData()
        {
            if (GetAll().FirstOrDefault() == null)
            {
                _persister.MakePersistent<PersistentPost, InMemoryPost>(new InMemoryPost()
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
    }
}
