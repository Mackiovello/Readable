﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        T GetById(ulong id);

        T Insert(T entity);

        bool TryUpdate(T entity, ulong id);
    }
}
