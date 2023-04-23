
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using Shelf_Sharks.Models;

namespace Shelf_Sharks.WebApi 
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
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
            app.UseStaticFiles();
            app.MapControllers();
            app.Run();

        }

    }
}