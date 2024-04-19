using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace Thought.Server.Interfaces
{
    public interface IWebSocketHandler
    {
        Task OnConnectedAsync(WebSocket socket);
        Task OnDisconnectedAsync(WebSocket socket);
        Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}