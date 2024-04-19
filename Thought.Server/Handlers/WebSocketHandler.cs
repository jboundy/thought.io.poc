using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using Thought.Server.Interfaces;

namespace Thought.Server.Handlers
{
    public class WebSocketHandler : IWebSocketHandler
    {
        ConcurrentDictionary<WebSocket, object> ActiveSockets = new ConcurrentDictionary<WebSocket, object>();
        public WebSocketHandler()
        {

        }

        public async Task OnConnectedAsync(WebSocket socket)
        {
             ActiveSockets.TryAdd(socket, new object());

            // Optionally, you can perform any initialization logic here
            // For example, sending a welcome message to the connected client
            string welcomeMessage = "Welcome to the WebSocket server!";
            byte[] welcomeMessageBytes = Encoding.UTF8.GetBytes(welcomeMessage);
            await socket.SendAsync(new ArraySegment<byte>(welcomeMessageBytes), WebSocketMessageType.Text, true, CancellationToken.None);
            
        }

        public async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
             if (result.MessageType == WebSocketMessageType.Text)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                await socket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes("Server received: " + message)), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                return;
            }
            else
            {
                // Handle binary message
            }
        }

        public async Task OnDisconnectedAsync(WebSocket socket)
        {            
            object value;
            ActiveSockets.Remove(socket, out value);
        }
    }
}