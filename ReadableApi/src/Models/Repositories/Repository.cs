using System.Collections.Generic;
using System.Linq;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;

namespace ReadableApi.Models
{
    public class Repository<T> : IRepository<T>
        where T: class, IPersistable
    {
        private IDbWriter writer;
        private IDbReader reader;

        public Repository(IDbWriter dbWriter, IDbReader dbReader)
        {
            writer = dbWriter;
            reader = dbReader;
        }

        public IEnumerable<T> GetAll() => (IEnumerable<T>)reader.All();

        public T Insert(T post)
        {
            writer.CreatePersistentObject(post);

            return post;
        }

        public void Update(T post, ulong id)
        {
            writer.UpdatePersistentObject(post, id);
        }

        public T GetById(ulong id) => (T)reader.ById(id);
    }
}
