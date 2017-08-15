using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Starcounter.Core;
using System.Linq;
using System.Text;
using System;
using Newtonsoft.Json;

namespace CoreServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.Run(async context =>
            {
                string path = context.Request.Path.Value.Substring(1);
                var responseBuilder = new StringBuilder();

                Db.Transact(() =>
                {
                    var posts = Db.SQL<Post>($"SELECT p FROM CoreServer.Post p");
                   
                    if (posts.FirstOrDefault() == null)
                    {
                        var newPost = Db.Insert<Post>();
                        newPost.Title = "Test title";
                        newPost.Category = "MyCategory";
                        newPost.Body = "Body of post";
                        newPost.Author = "Author";
                        newPost.Inserted();
                    }

                    responseBuilder.Append(JsonConvert.SerializeObject(posts));
                });

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(responseBuilder.ToString());
            });

            app.UseMvc();
        }
    }
}
