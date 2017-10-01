using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    [Database]
    public abstract class PersistentPost : IPost, IPersistent
    {
        internal protected PersistentPost()
        {
            Timestamp = DateTime.Now;
            Deleted = false;
            VoteScore = 0;
        }

        public IPersistable InMemoryInstance => new InMemoryPost()
        {
            Timestamp = Timestamp,
            Title = Title,
            Body = Body,
            Author = Author,
            Category = Category,
            VoteScore = VoteScore,
            Deleted = Deleted,
            Id = Id
        };

        public abstract DateTime Timestamp { get; set; }
        public abstract string Title { get; set; }
        public abstract string Body { get; set; }
        public abstract string Author { get; set; }
        public abstract string Category { get; set; }
        public abstract int? VoteScore { get; set; }
        public abstract bool Deleted { get; set; }
        public ulong Id => this.GetObjectNo();
    }
}
