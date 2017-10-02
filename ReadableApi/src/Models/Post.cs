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
        public PostDto Dto => Db.Transact(() => Mapper.Map<PostDto>(this.PersistentPost));

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

        private Post(PersistentPost persistentPost)
        {
            // Should be wrapped in a transaction
            // Figure how to do nested transactions properly
            PersistentPost = persistentPost;
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

        public static IEnumerable<Post> GetAll()
        {
            return Db.Transact(() =>
            {
                // Problem: Post can't be serialized, have to create DTO
                var persistentPosts = Db.SQL<PersistentPost>($"SELECT p FROM {typeof(PersistentPost)} p");
                var post = new Post(persistentPosts.FirstOrDefault());
                var posts = ConvertToPosts(persistentPosts);
                return posts;
            });
        }

        private static IEnumerable<Post> ConvertToPosts(IEnumerable<PersistentPost> persistentPosts)
        {
            IList<Post> posts = new List<Post>();
            foreach (var post in persistentPosts)
                posts.Add(new Post(post));

            return posts;
        }

        public static Post GetById(ulong id)
        {
            return Db.Transact(() =>
            {
                var persistentPost = Db.FromId<PersistentPost>(id);

                // TODO: use the null object pattern instead to avoid passing null
                if (persistentPost == null)
                    return null;

                return new Post(persistentPost);
            });
        }

        public static IEnumerable<PostDto> GetAllDto()
        {
            return Db.Transact(() =>
            {
                var persistentPosts = Db.SQL<PersistentPost>($"SELECT p FROM {typeof(PersistentPost)} p");
                return Mapper.Map<IEnumerable<PostDto>>(persistentPosts);
            });
        }

        public static PostDto GetDtoById(ulong id)
        {
            return Db.Transact(() =>
            {
                var persistentPost = Db.FromId<PersistentPost>(id);

                if (persistentPost == null)
                    return null;

                return Mapper.Map<PostDto>(persistentPost);
            });
        }
    }
}
