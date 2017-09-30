using AutoMapper;
using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public class Persister : IPersister
    {
        private IDatabase _db;
        private IMapper _mapper;

        public Persister(IDatabase database, IMapper mapper)
        {
            _db = database;
            _mapper = mapper;
        }

        public void MakePersistent<TPerm, TTemp>(TTemp toPersist) 
            where TPerm : class, IPersistent
            where TTemp : class, IPersistable
        {
            _db.Transact(() =>
            {
                var persistentObject = Db.Insert<TPerm>();
                _mapper.Map(toPersist, persistentObject);
            });
        }

        public void PersistentUpdate<TPerm, TTemp>(TTemp toUpdateFrom, ulong persistentId)
            where TPerm : class, IPersistent
            where TTemp : class, IPersistable
        {
            _db.Transact(() =>
            {
                var persistentPost = _db.FromId<PersistentPost>(persistentId);
                _mapper.Map(toUpdateFrom, persistentPost);
            });
        }
    }
}
