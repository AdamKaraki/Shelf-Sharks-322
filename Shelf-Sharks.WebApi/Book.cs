using System;

namespace Shelf_Sharks.Models
{
    public class Book
    {
        public Book(
            string author,
            string title,
            string description,
            int isbn,
            bool checkoutStatus = false) {
                Author = author;
                Title = title;
                Description = description;
                ISBN = isbn;
                isCheckedOut = checkoutStatus;
                uuid = Guid.NewGuid();
        }
        public string Author { get; init;}
        public string Title { get; init; }
        public string Description { get; init; }
        public int ISBN { get; init; }
        public bool isCheckedOut { get; set; }
        public Guid uuid { get; init; }
    }

}