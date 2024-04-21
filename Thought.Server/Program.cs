using Thought.Server.Handlers;

namespace Thought.Server
{
    public class Program{
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            // Use WebSocket middleware
            app.UseWebSockets();
            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/ws")
                {
                    await WebSocketHandler.HandleWebSocketAsync(context);
                }
                else
                {
                    await next();
                }
            });

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
