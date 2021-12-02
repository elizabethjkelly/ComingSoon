using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

using Opsi.ComingSoon.Core.Interface;
using Opsi.ComingSoon.Core;
using Opsi.ComingSoon.Core.Model;

namespace Opsi.ComingSoon.Data
{
  public class DataProvider : IDataProvider
  {
    private readonly IConfigurationSection _config;

    public DataProvider(IConfiguration config)
    {
      _config = config.GetSection("database");
    }

    public async Task<List<TEntity>> QueryAsync<TEntity>(QuerySpecification<TEntity> spec) where TEntity : Entity
    {
      // TODO: Implement ids filter:
      //spec.Ids

      // TODO: Implement date-range filter:
      //spec.DateRange;

      // TODO: Implement paging:
      //spec.Paging

      // TODO: Implement sorting:
      //spec.Sort

      // TODO: Implement to load only specified fields:
      //spec.Fields

      // Mock DB access:

      var connectionString = _config.GetValue<string>("connectionString");
      var collectionName = spec.TypeName == nameof(Movie)
        ? "movies"
        : throw new InvalidOperationException($"No collection for type {spec.TypeName} exists.");

      var json = await File.ReadAllTextAsync(@$"{connectionString}/{collectionName}.json");

      var serializerOptions = new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        Converters = { new IdSerializer() }
      };
      var entities = JsonSerializer.Deserialize<List<TEntity>>(json, serializerOptions);

      return entities;
    }
  }
}
