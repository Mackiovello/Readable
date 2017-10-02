using AutoMapper;
using Starcounter.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadableApi.Models
{
    public class Post
    {
        private PersistentPost PersistentPost;

        public Post()
        {
            Db.Transact(() =>
            {
                PersistentPost = Db.Insert<PersistentPost>();
                PersistentPost.Timestamp = DateTime.Now;
                PersistentPost.Deleted = false;
                PersistentPost.VoteScore = 0;
            });
        }

        public DateTime Timestamp => Db.Transact(() => PersistentPost.Timestamp);

        public string Title
        {
            get => Db.Transact(() => PersistentPost.Title);
            set => Db.Transact(() => PersistentPost.Title = value);
        }

        public string Body
        {
            get => Db.Transact(() => PersistentPost.Body);
            set => Db.Transact(() => PersistentPost.Body = value);
        }

        public string Author
        {
            get => Db.Transact(() => PersistentPost.Author);
            set => Db.Transact(() => PersistentPost.Author = value);
        }

        public string Category
        {
            get => Db.Transact(() => PersistentPost.Category);
            set => Db.Transact(() => PersistentPost.Category = value);
        }

        public int? VoteScore
        {
            get => Db.Transact(() => PersistentPost.VoteScore);
            set => Db.Transact(() => PersistentPost.VoteScore = value);
        }

        public bool? Deleted
        {
            get => Db.Transact(() => PersistentPost.Deleted);
            set => Db.Transact(() => PersistentPost.Deleted = value);
        }

        public ulong Id => Db.Transact(() => PersistentPost.GetObjectNo());
    }
}
