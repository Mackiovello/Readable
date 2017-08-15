using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreServer
{
    [Database]
    public abstract class Post
    {
        public abstract string Title { get; set; }
        public abstract string Author { get; set; }
        public abstract string Body { get; set; }
        public abstract string Category { get; set; }
        public abstract int Timestamp { get; set; }
        public abstract int VoteScore { get; set; }
        public abstract bool Deleted { get; set; }
    }
}
