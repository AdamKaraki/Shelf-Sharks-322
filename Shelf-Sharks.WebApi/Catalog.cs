using System.Collections.Generic;

namespace Shelf_Sharks.Models
{
    public class Catalog
    {
        public Catalog() {
            books = new Dictionary<int, Book>();
        }
        public static Dictionary<int, Book> books { get; set; }
    }
}