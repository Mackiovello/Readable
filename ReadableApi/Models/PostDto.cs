using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    public class PostDto
    {
        public DateTime Timestamp { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public int? VoteScore { get; set; }
        public ulong Id { get; set; }
    }
}
