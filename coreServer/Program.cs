using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Starcounter.Core.Hosting;
using Starcounter.Core.AspNetCore;
using Starcounter.Core;

namespace CoreServer
{
    public class Program
    {
        public static void Main(string[] args)
        {

            using (var appHost = new AppHostBuilder().Build())
            {
                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>()
                    .ConfigureServices(services => services.AddStarcounter(appHost))
                    .Build();

                host.Run();

                bool noPosts = Db.SQL<Post>($"SELECT p FROM {nameof(Post)} p").FirstOrDefault() == null;

                if (noPosts)
                {
                    Db.Transact(() =>
                    {
                        var post = Db.Insert<Post>();
                        post.Title = "Test title";
                    });
                }
            }
        }
    }
}
