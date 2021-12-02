using System;
using Microsoft.Extensions.DependencyInjection;

using Opsi.ComingSoon.Core.Interface;

namespace Opsi.ComingSoon.Data.AspNet
{
  public static class ServiceCollectionExtensions
  {
    public static void AddOpsiComingSoonData(this IServiceCollection services)
    {
      services.AddScoped<IDataProvider, DataProvider>();
    }
  }
}
