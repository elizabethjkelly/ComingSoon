using System;
using System.Text.RegularExpressions;

namespace Opsi.ComingSoon.Core.Model
{
  /// <summary>
  /// Id value, implicitly convertable to and from string.
  /// </summary>
  public struct Id
  {
    public readonly string Value;

    public Id(string value)
    {
      if (value is null)
      {
        throw new InvalidInputException(nameof(Id), value, "Id value cannot be null.");
      }

      if (value.Contains("?"))
      {
        value = value.Replace("?", GenerateRandom());
      }

      var regex = new Regex("[^a-zA-Z0-9_.,/&+-]");
      Value = regex.Replace(value, "");

      if (string.IsNullOrWhiteSpace(Value))
      {
        throw new InvalidInputException(nameof(Id), value, $"May only contain valid characters: (a-z A-Z 0-9 / & - + _ , .)");
      }
    }

    public override string ToString() => Value;

    public static Id New => new(GenerateRandom());

    public static string GenerateRandom(int length = 8)
    {
      var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var chars = new char[length];
      var random = new Random();

      for (var i = 0; i < length; i++)
      {
        chars[i] = validChars[random.Next(validChars.Length)];
      }

      return new string(chars);
    }

    public static implicit operator Id(string value) => new(value);
    public static implicit operator string(Id id) => id.Value;

    public override bool Equals(object obj) => base.Equals(obj)
      || obj is string s && s == Value
      || obj is Id id && id.Value == Value;

    public override int GetHashCode() => Value.GetHashCode();
  }
}
