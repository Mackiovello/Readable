using AutoMapper;
using Starcounter.Core;

namespace ReadableApi.Models.Data
{
    public class DbWriter<TPerm> : IDbWriter
        where TPerm : class, IPersistent
    {
        private IDatabase _db;
        private IMapper _mapper;

        public DbWriter(IDatabase database, IMapper mapper)
        {
            _db = database;
            _mapper = mapper;
        }

        public void Write(IPersistable toPersist) 
        {
            _db.Transact(() =>
            {
                var persistentObject = Db.Insert<TPerm>();
                _mapper.Map(toPersist, persistentObject);
            });
        }

        public void Write(IPersistable toUpdateFrom, ulong persistentId)
        {
            _db.Transact(() =>
            {
                var persistentPost = _db.FromId<TPerm>(persistentId);
                _mapper.Map(toUpdateFrom, persistentPost);
            });
        }
    }
}
