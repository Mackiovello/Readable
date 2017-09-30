using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data.Interfaces
{
    public interface IDbReader<TTemp>
    {
        TTemp ById(ulong id);

        IEnumerable<TTemp> All();
    }
}
