using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    public interface IPost : IPersistable
    {
        DateTime Timestamp { get; set; }
        string Title { get; set; }
        string Body { get; set; }
        string Author { get; set; }
        string Category { get; set; }
        int? VoteScore { get; set; }
        bool Deleted { get; set; }
    }
}
