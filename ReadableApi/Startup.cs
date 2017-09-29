using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ReadableApi.DataAccessLayer;
using ReadableApi.Models;
using Starcounter.Core.AspNetCore;
using AutoMapper;

namespace ReadableApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Post, PostDto>());

            services.AddMvc();
            services.AddTransient<IDatabaseReader<PostDto>, InMemoryPostsRetriever>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStatusCodePages();

            app.UseMvc();
        }
    }
}
