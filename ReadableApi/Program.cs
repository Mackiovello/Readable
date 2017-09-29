using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Starcounter.Core.Hosting;
using Starcounter.Core.AspNetCore;
using Starcounter.Core.Abstractions;

namespace ReadableApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string databaseName = "defaultDatabase";

            if (!Starcounter.Core.Options.StarcounterOptions.TryOpenExisting(databaseName))
            {
                Directory.CreateDirectory(databaseName);
                Starcounter.Core.Bluestar.ScCreateDb.Execute(databaseName);
            }

            using (var appHost = new AppHostBuilder().UseDatabase(databaseName).Build())
            {
                BuildWebHost(args, appHost).Run();
            };
        }

        public static IWebHost BuildWebHost(string[] args, IAppHost appHost) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureServices(s => s.AddStarcounter(appHost))
                .Build();
    }
}
