using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models.Data
{
    [Database]
    public abstract class PersistentPost : IPost, IPersistent<InMemoryPost>
    {
        internal protected PersistentPost()
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

        public InMemoryPost InMemoryInstance => CreatePostWithSameValues();

        public Action<InMemoryPost> Update => (InMemoryPost post) => 
        {
            Title = post.Title ?? Title;
            Body = post.Body ?? Body;
            Author = post.Author ?? Author;
            Category = post.Category ?? Category;
            VoteScore = post.VoteScore ?? VoteScore;
            Deleted = post.Deleted ?? Deleted;
        };

        public Action<InMemoryPost> Instantiate => (InMemoryPost post) => 
        {
            Title = post.Title;
            Body = post.Title;
            Author = post.Author;
            Category = post.Category;
        };

        private InMemoryPost CreatePostWithSameValues()
        {
            return new InMemoryPost()
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
        }
    }
}
