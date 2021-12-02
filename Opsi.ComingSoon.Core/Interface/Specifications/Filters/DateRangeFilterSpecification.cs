using System;

namespace Opsi.ComingSoon.Core.Interface
{
  public class DateRangeFilterSpecification
  {
    public string PropertyName { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public bool IncludeNull { get; set; }
  }
}
