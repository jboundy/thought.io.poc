using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thought.Server.Handlers;
using Thought.Server.Model;

namespace Thought.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThoughtController : ControllerBase
    {
        public ThoughtController()
        {
            
        }

        [HttpPost]
        public async Task<IActionResult> SendNewThought([FromBody] JsonValue json){
            var newThought = JsonSerializer.Deserialize<ThoughtRequest>(json.ToJsonString());
            await WebSocketHandler.SendMessageToAll(newThought.Data);
            return Ok();
        }
    }
}