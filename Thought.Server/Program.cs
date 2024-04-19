using Thought.Server.Handlers;
using Thought.Server.Middleware;

namespace Thought.Server
{
    public class Program{
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddWebSocketManager();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

                          // Use WebSocket middleware
            app.UseWebSockets();

            // Map WebSocket endpoints
            app.MapWebSocketManager("/ws", new WebSocketHandler());

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(routes =>
            {
                routes.MapControllers();
            });

            app.Run();
        }
       
    }
}
