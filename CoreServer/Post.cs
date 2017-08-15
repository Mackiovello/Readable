using Newtonsoft.Json;
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
        public virtual void Inserted()
        {
            this.Created = DateTimeOffset.Now.ToUnixTimeSeconds();
            this.IsDeleted = false;
            this.VoteScore = 0;
        }

        [JsonProperty(PropertyName = "id")]
        public string Id => this.GetObjectID();
        [JsonProperty(PropertyName = "title")]
        public abstract string Title { get; set; }
        [JsonProperty(PropertyName = "author")]
        public abstract string Author { get; set; }
        [JsonProperty(PropertyName = "body")]
        public abstract string Body { get; set; }
        [JsonProperty(PropertyName = "category")]
        public abstract string Category { get; set; }
        [JsonProperty(PropertyName = "timestamp")]
        public abstract long Created { get; set; }
        [JsonProperty(PropertyName = "voteScore")]
        public abstract int VoteScore { get; set; }
        [JsonProperty(PropertyName = "deleted")]
        public virtual bool IsDeleted { get; set; }
    }
}
