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
using Starcounter.Core.Bluestar;

namespace CoreServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string database = "ReadableDatabase";

            var options = Starcounter.Core.Options.StarcounterOptions.TryOpenExisting(database);

            if (options == null)
            {
                Directory.CreateDirectory(database);
                ScCreateDb.Execute(database);
            }

            using (var appHost = new AppHostBuilder().UseDatabase(database).Build())
            {
                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>()
                    .ConfigureServices(services => services.AddStarcounter(appHost))
                    .Build();

                host.Run();
            }
        }
    }
}
