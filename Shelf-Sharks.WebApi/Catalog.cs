using System.Collections.Generic;

namespace Shelf_Sharks.Models
{
    public class Catalog
    {
        public Catalog() {
            books = new Dictionary<int, Book>();
        }

        public Book[] GetBooks()
        {
            return books.Values.ToArray();
        }

        public void CheckOutBook(int isbn)
        {
            if(!books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            } 
            else if(books[isbn].isCheckedOut)
            {
                throw new System.Exception(string.Format("book with isbn {} is already checked out", isbn));
            }
            books[isbn].isCheckedOut = true;
        }

        public void ReturnBook(int isbn)
        {
            if(!books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            } 
            else if(!books[isbn].isCheckedOut)
            {
                throw new System.Exception(string.Format("book with isbn {} is not checked out", isbn));
            }
            books[isbn].isCheckedOut = false;
        }

        public void AddBook(int isbn)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveBook(int isbn)
        {
            if(!books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            }
            else if(books[isbn].isCheckedOut)
            {
                throw new System.Exception(string.Format("Cannot remove book with isbn {} - already checked out", isbn));
            }
            books.Remove(isbn);
        }

        private static Dictionary<int, Book> books { get; set; }
    }
}