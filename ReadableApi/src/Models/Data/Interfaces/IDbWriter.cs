using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IDbWriter<TPerm, TTemp>
    {
        void Write(TTemp toPerist);

        void Write(TTemp toUpdateFrom, ulong persistentId);
    }
}
