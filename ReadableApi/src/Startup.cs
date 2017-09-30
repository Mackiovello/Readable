using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ReadableApi.Models;
using AutoMapper;
using ReadableApi.Models.Data;

namespace ReadableApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddTransient<IRepository<PostDto>, PostRepository>();
            services.AddSingleton<IDatabase, Database>();
            services.AddTransient<IPersister, Persister>();
            services.AddAutoMapper(cfg => 
            {
                cfg.CreateMap<PersistentPost, PostDto>();
                cfg.CreateMap<InMemoryPost, PersistentPost>();
                cfg.CreateMap<PostDto, PersistentPost>();
            });
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
