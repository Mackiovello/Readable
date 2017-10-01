using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ReadableApi.Models;
using AutoMapper;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;

namespace ReadableApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddTransient<IRepository<InMemoryPost>, Repository<InMemoryPost, PersistentPost>>();
            services.AddSingleton<IDatabase, Database>();
            services.AddTransient<IDbWriter<PersistentPost, InMemoryPost>, DbWriter<PersistentPost, InMemoryPost>>();
            services.AddTransient<IDbReader<InMemoryPost>, DbReader<InMemoryPost, PersistentPost>>();
            services.AddAutoMapper(cfg => 
            {
                cfg.CreateMap<PersistentPost, InMemoryPost>();
                cfg.CreateMap<InMemoryPost, PersistentPost>()
                    .ForAllMembers(opt => opt.Condition((src, dest, sourceMember) => sourceMember != null));
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
