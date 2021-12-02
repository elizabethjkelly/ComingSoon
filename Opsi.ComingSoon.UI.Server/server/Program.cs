using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace Opsi.ComingSoon.UI.Server
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = new WebHostBuilder()
          .UseKestrel()
           .ConfigureLogging(logging => {
             logging.ClearProviders();
             logging.AddConsole();
             logging.SetMinimumLevel(LogLevel.Debug);
           })
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }
  }
}
