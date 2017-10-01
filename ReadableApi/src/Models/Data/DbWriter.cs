using AutoMapper;
using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public class DbWriter<TPerm, TTemp> : IDbWriter<TPerm, TTemp>
        where TPerm : class, IPersistent
        where TTemp : class, IPersistable
    {
        private IDatabase _db;
        private IMapper _mapper;

        public DbWriter(IDatabase database, IMapper mapper)
        {
            _db = database;
            _mapper = mapper;
        }

        public void Write(TTemp toPersist) 
        {
            _db.Transact(() =>
            {
                var persistentObject = Db.Insert<TPerm>();
                _mapper.Map(toPersist, persistentObject);
            });
        }

        public void Write(TTemp toUpdateFrom, ulong persistentId)
        {
            _db.Transact(() =>
            {
                var persistentPost = _db.FromId<TPerm>(persistentId);
                _mapper.Map(toUpdateFrom, persistentPost);
            });
        }
    }
}
