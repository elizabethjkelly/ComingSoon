using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Opsi.ComingSoon.Core.Model;
using Opsi.ComingSoon.Core.Interface;

namespace Opsi.ComingSoon.IO.AspNet
{
  [Route("api")]
  public class Api : Controller
  {
    private readonly ILogger<Api> _logger;

    public Api(ILogger<Api> logger)
    {
      _logger = logger;
    }

    [HttpGet, Route("movies")]
    public async Task<object> GetMovies([FromServices] IDataProvider dataProvider)
    {
      _logger.LogInformation($"Get movies");
      return await dataProvider.QueryAsync(new QuerySpecification<Movie>());
    }
  }
}
