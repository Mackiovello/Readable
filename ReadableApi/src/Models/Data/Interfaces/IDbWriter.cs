using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IDbWriter
    {
        void CreatePersistentObject(IPersistable toPerist);

        void UpdatePersistentObject(IPersistable toUpdateFrom, ulong persistentId);
    }
}
