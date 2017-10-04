using Starcounter.Core;
using System.Collections.Generic;

namespace ReadableApi.Models
{
    public static class IEnumerableExtensions
    {
        public static IEnumerable<Post> ToInMemory(this IEnumerable<PersistentPost> persistentPosts)
        {
            return Db.Transact(() =>
            {
                IList<Post> posts = new List<Post>();
                foreach (var post in persistentPosts)
                    posts.Add(new Post(post));
                return posts;
            }, new TransactOptions(() => { }));
        }
    }
}
