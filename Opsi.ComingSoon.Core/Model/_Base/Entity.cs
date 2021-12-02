namespace Opsi.ComingSoon.Core.Model
{
  public class Entity
  {
    public Id Id { get; }

    public Entity(Id id)
    {
      Id = id;
    }

    protected Entity() { }
  }
}
