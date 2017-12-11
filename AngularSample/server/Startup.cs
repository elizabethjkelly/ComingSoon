using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AngularSample
{
  public class Startup
  {
    public IConfigurationRoot Configuration { get; }
    public IContainer ApplicationContainer { get; private set; }

    public Startup(IHostingEnvironment env)
    {
      Configuration = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .Build();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();
      services.AddMvcCore()
        .AddJsonFormatters(options => {
          options.ContractResolver = new CamelCasePropertyNamesContractResolver();
          options.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
    {
      app.UseCors(config => config
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());

      app.UseDefaultFiles();
      app.UseStaticFiles(new StaticFileOptions
      {
        OnPrepareResponse = (context) => {
          if (context.Context.Request.Path.StartsWithSegments("/app/app.js"))
          {
            context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
          }
        }
      });
    }
  }
}
