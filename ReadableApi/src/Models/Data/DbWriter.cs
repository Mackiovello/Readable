using AutoMapper;
using Starcounter.Core;

namespace ReadableApi.Models.Data
{
    public class DbWriter<TPerm> : IDbWriter
        where TPerm : class, IPersistent<IPersistable>
    {
        private IDatabase _db;

        public DbWriter(IDatabase database)
        {
            _db = database;
        }

        public void CreatePersistentObject(IPersistable instantiateFrom) 
        {
            _db.Transact(() =>
            {
                var persistent = Db.Insert<TPerm>();
                persistent.Instantiate(instantiateFrom);
            });
        }

        public void UpdatePersistentObject(IPersistable toUpdateFrom, ulong idOfPersitentObject)
        {
            _db.Transact(() =>
            {
                var persistent = _db.FromId<TPerm>(idOfPersitentObject);
                persistent.Update(toUpdateFrom);
            });
        }
    }
}
