
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using Shelf_Sharks.Models;

namespace Shelf_Sharks.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webapp_url = System.Environment.GetEnvironmentVariable("WEBAPP_URL");
            if (webapp_url == null)
            {
                // for local development
                webapp_url = "http://localhost:3000";
            }

            var builder = WebApplication.CreateBuilder(args);

            // add the webapp url to the CORS policy
            // this allows us to run the webapp on a separate
            // server or docker container
            var AllowWebAppOrigin = "_allowWebAppOrigin";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: AllowWebAppOrigin,
                    policy =>
                    {
                        policy.WithOrigins(webapp_url);
                    });
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // add DB context here
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(AllowWebAppOrigin);
            app.UseStaticFiles();
            app.MapControllers();
            app.Run();

        }

    }
}