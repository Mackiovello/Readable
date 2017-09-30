using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
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

            CreateDatabase(databaseName);

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

        private static void CreateDatabase(string databaseName)
        {
            if (Starcounter.Core.Options.StarcounterOptions.TryOpenExisting(databaseName))
                return;

            Directory.CreateDirectory(databaseName);
            Starcounter.Core.Bluestar.ScCreateDb.Execute(databaseName);
        }
    }
}
