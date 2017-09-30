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
        private IPersister _persister;
        private IDbReader<TTemp> _dbReader;

        public Repository(IPersister persister, IDbReader<TTemp> dbReader)
        {
            _persister = persister;
            _dbReader = dbReader;
        }

        public IEnumerable<TTemp> GetAll() => _dbReader.All();

        public TTemp Insert(TTemp post)
        {
            _persister.MakePersistent<TPerm, TTemp>(post);

            return post;
        }

        public void Update(TTemp post, ulong id)
        {
            _persister.PersistentUpdate<TPerm, TTemp>(post, id);
        }

        public TTemp GetById(ulong id) => _dbReader.ById(id);
    }
}
