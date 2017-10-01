using System.Collections.Generic;
using System.Linq;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;

namespace ReadableApi.Models
{
    public class Repository<TTemp, TPerm> : IRepository<TTemp>
        where TTemp: class, IPersistable
        where TPerm: class, IPersistent<TTemp>
    {
        private IDbWriter writer;
        private IDbReader reader;

        public Repository(IDbWriter dbWriter, IDbReader dbReader)
        {
            writer = dbWriter;
            reader = dbReader;
        }

        public IEnumerable<TTemp> GetAll() => (IEnumerable<TTemp>)reader.All();

        public TTemp Insert(TTemp post)
        {
            writer.CreatePersistentObject(post);

            return post;
        }

        public void Update(TTemp post, ulong id)
        {
            writer.UpdatePersistentObject(post, id);
        }

        public TTemp GetById(ulong id) => (TTemp)reader.ById(id);
    }
}
