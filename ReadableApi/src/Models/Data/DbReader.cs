using AutoMapper;
using ReadableApi.Models.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public class DbReader<TTemp, TPerm> : IDbReader<TTemp>
    {
        private IDatabase _db;
        private IMapper _mapper;

        public DbReader(IDatabase db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public IEnumerable<TTemp> All()
        {
            return _db.Transact(() =>
            {
                var persistent = _db.SQL<TPerm>($"SELECT t FROM {typeof(TPerm)} t");
                return _mapper.Map<IEnumerable<TTemp>>(persistent);
            });
        }

        public TTemp ById(ulong id)
        {
            return _db.Transact(() =>
            {
                var persistent = _db.FromId<TPerm>(id);
                return _mapper.Map<TTemp>(persistent);
            });
        }
    }
}
