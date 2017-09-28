using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.DatabaseAccess
{
    public interface IDatabaseReader<T>
    {
        T GetFirst();

        List<T> GetAll();

        T GetById(ulong id);
    }
}
