using ReadableApi.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    public interface IRepository<TTemp> 
        where TTemp : class, IPersistable
    {
        IEnumerable<TTemp> GetAll();

        TTemp GetById(ulong id);

        TTemp Insert(TTemp entity);

        void Update(TTemp entity, ulong id);
    }
}
