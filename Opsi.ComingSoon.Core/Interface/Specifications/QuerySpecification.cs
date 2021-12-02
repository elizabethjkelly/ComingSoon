using System.Collections.Generic;
using System.Linq;

using Opsi.ComingSoon.Core.Model;

namespace Opsi.ComingSoon.Core.Interface
{
  public class QuerySpecification<TEntity> : QuerySpecification
  {
    public QuerySpecification()
      : base(typeof(TEntity).Name) { }

    public QuerySpecification(Id id)
      : base(new string[] { id }, typeof(TEntity).Name) { }

    public QuerySpecification(IEnumerable<Id> ids)
      : base(ids.Select(id => (string)id), typeof(TEntity).Name) { }

    public QuerySpecification(IEnumerable<string> ids)
      : base(ids, typeof(TEntity).Name) { }
  }

  public class QuerySpecification
  {
    public string TypeName { get; }

    public IEnumerable<string> Ids { get; set; }
    public DateRangeFilterSpecification DateRange { get; set; }
    public IEnumerable<string> Fields { get; set; }
    public List<string> Sort { get; set; }
    public PagingSpecification Paging { get; set; }

    public QuerySpecification(string typeName)
     : this(null as IEnumerable<string>, typeName) { }

    public QuerySpecification(Id id, string typeName)
      : this(new string[] { id }, typeName) { }

    public QuerySpecification(IEnumerable<Id> ids, string typeName)
      : this(ids.Select(id => (string)id), typeName) { }

    public QuerySpecification(IEnumerable<string> ids, string typeName)
    {
      Ids = ids;
      TypeName = typeName;
    }
  }
}
