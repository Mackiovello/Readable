using Starcounter.Core;
using System.Collections.Generic;

namespace ReadableApi.Models
{
    public class DbReader<T>
    {
        public IEnumerable<T> All() => Db.Transact(() => Db.SQL<T>($"SELECT t FROM {typeof(T)} t"));

        public T ById(ulong id) => Db.Transact(() => Db.FromId<T>(id));
    }
}
