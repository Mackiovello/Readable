using AutoMapper;
using ReadableApi.Models.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public class DbReader<T> : IDbReader
        where T : class, IPersistent<IPersistable>
    {
        private IDatabase _db;

        public DbReader(IDatabase db)
        {
            _db = db;
        }

        public IEnumerable<IPersistable> All()
        {
            return _db.Transact(() =>
            {
                var persistent = _db.SQL<T>($"SELECT t FROM {typeof(T)} t");
                return persistent.Select(p => p.InMemoryInstance);
            });
        }

        public IPersistable ById(ulong id)
        {
            return _db.Transact(() =>
            {
                var persistent = _db.FromId<T>(id);
                return persistent.InMemoryInstance;
            });
        }
    }
}
