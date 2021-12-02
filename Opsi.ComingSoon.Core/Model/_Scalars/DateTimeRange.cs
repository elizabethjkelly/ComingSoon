using System;

namespace Opsi.ComingSoon.Core.Model
{
  public class DateTimeRange
  {
    public DateTime From { get; private set; }

    public DateTime To { get; private set; }

    public bool IsEmpty { get; private set; }

    public DateTimeRange(DateTime from = default, DateTime to = default)
    {
      if (from == default || to == default)
      {
        IsEmpty = true;
        return;
      }

      if (from > to)
      {
        throw new Exception("Invalid dates specified, 'from' must precede 'to'.");
      }

      From = from;
      To = to;
    }

    private DateTimeRange() { }

    public bool ContainsTime(DateTime time)
    {
      return time >= From && time <= To;
    }

    public override string ToString()
    {
      return $"{From:yyyy-MM-dd HH:mm:ss} - {To:yyyy-MM-dd HH:mm:ss}";
    }
  }
}
