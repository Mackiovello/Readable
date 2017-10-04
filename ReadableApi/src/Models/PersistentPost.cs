using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    [Database]
    public abstract class PersistentPost
    {
        public PersistentPost()
        {
            Timestamp = DateTime.Now;
            Deleted = false;
            VoteScore = 0;
        }

        public abstract DateTime Timestamp { get; set; }
        public abstract string Title { get; set; }
        public abstract string Body { get; set; }
        public abstract string Author { get; set; }
        public abstract string Category { get; set; }
        public abstract int? VoteScore { get; set; }
        public abstract bool? Deleted { get; set; }
        public ulong Id => this.GetObjectNo();
    }
}
