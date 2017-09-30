using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    public class Database : IDatabase
    {
        public IEnumerable<T> GetAll<T>()
        {
            return Db.SQL<T>($"SELECT a FROM {typeof(T)} a");
        }

        public T FromId<T>(ulong id)
        {
            return Db.FromId<T>(id);
        }

        public T Insert<T>() where T : class
        {
            return Db.Insert<T>();
        }

        public IEnumerable<T> SQL<T>(string query, params object[] values)
        {
            return Db.SQL<T>(query, values);
        }

        public IEnumerable<T> SQL<T>(string query)
        {
            return Db.SQL<T>(query);
        }

        public T Transact<T>(Func<T> func)
        {
            return Db.Transact(func);
        }

        public void Transact(Action action)
        {
            Db.Transact(action);
        }
    }
}
