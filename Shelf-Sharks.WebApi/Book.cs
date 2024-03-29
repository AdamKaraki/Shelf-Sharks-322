using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Shelf_Sharks.Models
{
    /// <summary>
    /// Represents a single book in the library catalog
    /// </summary>
    public class Book
    {

        public Book()
        {
            UUID = Guid.NewGuid();
        }


        /// <summary>
        /// Constructor for adding a new book that isn't in the catalog.
        /// Without using the Google Books API
        /// </summary>
        /// <param name="author">The book's author</param>
        /// <param name="title">The book's title</param>
        /// <param name="description">A short description of the book</param>
        /// <param name="isbn">The book's ISBN</param>
        /// <param name="checkoutStatus">Has the book been checked out?</param>
        public Book(
            string author,
            string title,
            string description,
            Int64 isbn, // isbn's have 13 digits, which is more than Int32's max val
            bool checkoutStatus = false)
        {
            Author = author;
            Title = title;
            Description = description;
            ISBN = isbn;
            IsCheckedOut = checkoutStatus;
            UUID = Guid.NewGuid();
        }

        /// <summary>
        /// Constructor for adding a new book that isn't in the catalog. 
        /// Will search Google books API for a matching ISBN and populate
        /// </summary>
        /// <param name="isbn">the ISBN number of the book</param>
        public Book(Int64 isbn)
        {
            ISBN = isbn;
            UUID = Guid.NewGuid();
            IsCheckedOut = false;

            // fetch other data from google books service
            Google.Apis.Books.v1.Data.Volumes result =
                Catalog.BooksService.Volumes.List(isbn.ToString()).Execute();

            if (result != null && result.Items != null)
            {
                // get first book from list of results for ISBN
                Google.Apis.Books.v1.Data.Volume volume = result.Items.FirstOrDefault();

                if (volume != null)
                {
                    // set book properties
                    PopulateFromVolume(volume);
                }
            }
        }

        public Book(string googleBooksId)
        {
            // get book details from id
            Google.Apis.Books.v1.Data.Volume volume =
                Catalog.BooksService.Volumes.Get(googleBooksId).Execute();

            PopulateFromVolume(volume);
        }

        public Book(Google.Apis.Books.v1.Data.Volume volume)
        {
            PopulateFromVolume(volume);
        }

        /// <summary>
        /// Populates the book's properties from a Google Books API Volume object
        /// </summary>
        /// <param name="volume"></param>
        public void PopulateFromVolume(Google.Apis.Books.v1.Data.Volume volume)
        {
            GoogleBooksId = volume.Id;
            // find ISBN 13
            foreach (var id in volume.VolumeInfo.IndustryIdentifiers)
            {
                if (id.Type == "ISBN_13")
                {
                    ISBN = Int64.Parse(id.Identifier);
                }
            }
            if (volume.VolumeInfo.Authors != null)
            {
                Author = volume.VolumeInfo.Authors.First() ?? "Unknown Author";
            }
            else
            {
                Author = "Unknown Author";
            }
            Title = volume.VolumeInfo.Title ?? "Unknown Title";
            Description = volume.VolumeInfo.Description ?? "Description not available.";
            if (volume.VolumeInfo.ImageLinks != null)
            {
                CoverURL = volume.VolumeInfo.ImageLinks.Thumbnail ?? "Unknown";
            }
            else
            {
                CoverURL = "Unknown";
            }
        }

        public void CheckOut()
        {
            if (IsCheckedOut == true)
            {
                throw new System.Exception(string.Format("book with isbn {} is already checked out", ISBN));
            }
            IsCheckedOut = true;
            DateCheckedOut = DateTime.Now;
            DateReturnBy = DateTime.Now.AddDays(14);
        }

        public int Id { get; set; }
        public string? Author { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Int64 ISBN { get; set; }
        public bool IsCheckedOut { get; set; }
        public string? CoverURL { get; set; }
        public Guid UUID { get; init; } = Guid.NewGuid();
        public String GoogleBooksId { get; set; }
        public DateTime DateAdded { get; init; } = DateTime.Now;
        public DateTime DateCheckedOut { get; set; }
        public DateTime DateReturnBy { get; set; }

        // this variable isn't stored in the database
        [NotMapped]
        public bool InCatalog { get; set; } = true;

    }

}