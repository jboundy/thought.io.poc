using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thought.Server.Handlers;
using Thought.Server.Interfaces;

namespace Thought.Server.Middleware
{
    public static class WebSocketMiddlewareExtensions
    {
        public static IApplicationBuilder MapWebSocketManager(this IApplicationBuilder app, PathString path, IWebSocketHandler webSocketHandler)
        {
            return app.Map(path, (x) => x.UseMiddleware<WebSocketHandlerBase>(webSocketHandler));
        }

        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddSingleton<IWebSocketHandler, WebSocketHandler>();
            return services;
        }
    }
}