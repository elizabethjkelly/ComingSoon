using System;

namespace Opsi.ComingSoon.Core.Model
{
  public class Movie : Entity
  {
    public string Name { get; set; }
    public string Description { get; set; }
    public double Rating { get; set; }
    public string PosterUrl { get; set; }

    public Movie(Id id, string name) : base(id)
    {
      Name = name;
    }

    private Movie() : base() { }
  }
}
