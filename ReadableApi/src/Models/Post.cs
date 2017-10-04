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
            });
        }

        public Post(PersistentPost persistentPost)
        {
            Db.Transact(() =>
            {
                PersistentPost = persistentPost;
            }, new TransactOptions(() => { }));
        }

        public DateTime Timestamp => Db.Transact(() => PersistentPost.Timestamp, new TransactOptions(() => { }));

        // Confusing behavior of nested transactions request TransactOptions:
        // https://github.com/Starcounter/Starcounter.Core/issues/215
        public string Title
        {
            get => Db.Transact(() => PersistentPost.Title, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.Title = value, new TransactOptions(() => { }));
        }

        public string Body
        {
            get => Db.Transact(() => PersistentPost.Body, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.Body = value, new TransactOptions(() => { }));
        }

        public string Author
        {
            get => Db.Transact(() => PersistentPost.Author, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.Author = value, new TransactOptions(() => { }));
        }

        public string Category
        {
            get => Db.Transact(() => PersistentPost.Category, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.Category = value, new TransactOptions(() => { }));
        }

        public int? VoteScore
        {
            get => Db.Transact(() => PersistentPost.VoteScore, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.VoteScore = value, new TransactOptions(() => { }));
        }

        public bool? Deleted
        {
            get => Db.Transact(() => PersistentPost.Deleted, new TransactOptions(() => { }));
            set => Db.Transact(() => PersistentPost.Deleted = value, new TransactOptions(() => { }));
        }

        public ulong Id => Db.Transact(() => PersistentPost.GetObjectNo());

        public PostDto ToDto()
        {
            return Db.Transact(() =>
                Mapper.Map<PostDto>(this.PersistentPost));
        }

        // Should be moved somewhere else, it's not this class's resposibility
        public static IEnumerable<Post> GetAll()
        {
            return Db.Transact(() =>
            {
                var posts = Db.SQL<PersistentPost>(
                    $"SELECT p FROM {typeof(PersistentPost)} p");

                return posts.ToInMemory();
            });
        }

        // Should be moved somewhere else, it's not this class's resposibility
        public static Maybe<Post> GetById(ulong id)
        {
            return Db.Transact(() =>
            {
                var persistentPost = Db.FromId<PersistentPost>(id);

                if (persistentPost == null)
                    return Maybe<Post>.None();

                return Maybe<Post>.Some(new Post(persistentPost));
            });
        }
    }
}
