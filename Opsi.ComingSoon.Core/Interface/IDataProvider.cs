using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Opsi.ComingSoon.Core.Model;

namespace Opsi.ComingSoon.Core.Interface
{
  public interface IDataProvider
  {
    Task<List<TEntity>> QueryAsync<TEntity>(QuerySpecification<TEntity> spec) where TEntity : Entity;
  }
}
