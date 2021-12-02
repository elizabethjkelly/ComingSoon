using System;
using System.Text.Json;
using System.Text.Json.Serialization;

using Opsi.ComingSoon.Core.Model;

namespace Opsi.ComingSoon.Core
{
  public class IdSerializer : JsonConverter<Id>
  {
    public override Id Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
      return reader.GetString();
    }

    public override void Write(Utf8JsonWriter writer, Id id, JsonSerializerOptions options)
    {
      writer.WriteStringValue(id);
    }
  }
}
