using System.Collections.Generic;
using System.Linq;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;

namespace ReadableApi.Models
{
    public class Repository<TTemp, TPerm> : IRepository<TTemp>
        where TTemp: class, IPersistable
        where TPerm: class, IPersistent
    {
        private IDbWriter<TPerm, TTemp> writer;
        private IDbReader<TTemp> reader;

        public Repository(IDbWriter<TPerm, TTemp> dbWriter, IDbReader<TTemp> dbReader)
        {
            writer = dbWriter;
            reader = dbReader;
        }

        public IEnumerable<TTemp> GetAll() => reader.All();

        public TTemp Insert(TTemp post)
        {
            writer.Write(post);

            return post;
        }

        public void Update(TTemp post, ulong id)
        {
            writer.Write(post, id);
        }

        public TTemp GetById(ulong id) => reader.ById(id);
    }
}
