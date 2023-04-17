
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
            // add DB context here
            var app = builder.Build();
            app.MapControllers();
            app.Run();

        }

    }
}