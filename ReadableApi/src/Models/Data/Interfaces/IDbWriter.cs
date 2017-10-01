using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IDbWriter
    {
        void Write(IPersistable toPerist);

        void Write(IPersistable toUpdateFrom, ulong persistentId);
    }
}
