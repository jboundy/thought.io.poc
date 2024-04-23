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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.WithOrigins("https://ce66b207-5f91-449c-8983-951ab589e44c.e1-us-east-azure.choreoapps.dev")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
  
            app.UseSwagger();
            app.UseSwaggerUI();
  
             app.UseCors("AllowOrigin");

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
