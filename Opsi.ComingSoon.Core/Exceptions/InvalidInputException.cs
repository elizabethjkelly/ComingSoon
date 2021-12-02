using System;

namespace Opsi.ComingSoon.Core
{
  public class InvalidInputException : Exception
  {
    public InvalidInputException(string typeName, string value, string message)
      : base($"Invalid input '{value}' for {typeName}: {message}") { }

    public InvalidInputException(string message) : base($"Invalid input: {message}") { }
  }
}
