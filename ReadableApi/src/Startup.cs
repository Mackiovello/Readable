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
            services.AddTransient<IRepository<InMemoryPost>, Repository<InMemoryPost>>();
            services.AddSingleton<IDatabase, Database>();
            services.AddTransient<IDbWriter, DbWriter<IPersistent<IPersistable>>>();
            services.AddTransient<IDbReader, DbReader<IPersistent<IPersistable>>>();
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
