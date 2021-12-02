using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Opsi.ComingSoon.IO.AspNet
{
  public static class MvcCoreBuilderExtensions
  {
    public static IMvcCoreBuilder AddOpsiCommingSoonApi(this IMvcCoreBuilder builder)
    {
      builder.AddApplicationPart(Assembly.GetExecutingAssembly());

      return builder;
    }
  }
}
