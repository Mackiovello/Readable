using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data.Interfaces
{
    public interface IDbReader
    {
        IPersistable ById(ulong id);

        IEnumerable<IPersistable> All();
    }
}
