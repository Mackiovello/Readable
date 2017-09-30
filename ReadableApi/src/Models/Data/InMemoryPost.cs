using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public class InMemoryPost : IPost, IPersistable
    {
        public InMemoryPost()
        {
            Timestamp = DateTime.Now;
            Deleted = false;
            VoteScore = 0;
        }

        public DateTime Timestamp { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public int? VoteScore { get; set; }
        public bool Deleted { get; set; }
        public ulong Id { get; set; }
    }
}
