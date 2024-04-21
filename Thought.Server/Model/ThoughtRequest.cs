using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Thought.Server.Model
{
    public class ThoughtRequest
    {
        [JsonPropertyName("data")]
        public string Data { get; set; }
    }
}