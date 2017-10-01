using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IPersistent<T>
    {
        T InMemoryInstance { get; }
        Action<T> Update { get; }
        Action<T> Instantiate { get; }
    }
}
