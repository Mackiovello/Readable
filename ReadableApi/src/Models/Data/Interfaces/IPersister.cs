using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IPersister
    {
        void MakePersistent<TPerm, TTemp>(TTemp toPerist)
            where TPerm : class, IPersistent
            where TTemp : class, IPersistable;
    }
}
