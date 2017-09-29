using System;
using System.Collections.Generic;

namespace ReadableApi.Models
{
    public interface IDatabase
    {
        T Transact<T>(Func<T> func);

        void Transact(Action action);

        T FromId<T>(ulong id);

        IEnumerable<T> SQL<T>(string query, params object[] values);

        IEnumerable<T> SQL<T>(string query);

        T Insert<T>() where T : class;
    }
}
