using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using Shelf_Sharks.Models;

namespace Shelf_Sharks.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {

        private Catalog bookCatalog = new Catalog();

        [HttpGet("/books")]
        public ActionResult<ICollection<Book>> GetBooks()
        {
            try
            {
                return Ok(bookCatalog.GetBooks());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }

        }

        // search endpoint
        [HttpGet("/search")]
        public ActionResult<ICollection<Book>> SearchBooks([FromQuery] string query, [FromQuery] bool isCatalogSearch = true)
        {
            try
            {
                return Ok(bookCatalog.SearchBooks(query, isCatalogSearch));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("/book/{uuid}")]
        public ActionResult<Book> GetBook([FromRoute] Guid uuid)
        {
            try
            {
                return Ok(bookCatalog.GetBook(uuid));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("/stats/num_checked_out")]
        public ActionResult<int> GetNumCheckedOut()
        {
            try
            {
                return Ok(bookCatalog.GetNumCheckedOut());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("/books/recently_checked_out")]
        public ActionResult<Book[]> GetRecentlyCheckedOut()
        {
            try
            {
                return Ok(bookCatalog.GetRecentlyCheckedOut());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("/books/recently_added")]
        public ActionResult<Book[]> GetRecentlyAdded()
        {
            try
            {
                return Ok(bookCatalog.GetRecentlyAdded());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("/stats/num_books")]
        public ActionResult<int> GetNumBooks()
        {
            try
            {
                return Ok(bookCatalog.GetNumBooks());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/checkout")]
        public ActionResult<Book> CheckOutBook([FromBody] InputModel postData)
        {
            try
            {
                return Ok(bookCatalog.CheckOutBook(postData.uuid));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/return")]
        public ActionResult ReturnBook([FromBody] InputModel postData)
        {
            try
            {
                return Ok(bookCatalog.ReturnBook(postData.uuid));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/add")]
        public ActionResult AddBook([FromBody] InputModel postData)
        {
            try
            {
                bookCatalog.AddBook(postData.googleBooksId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/remove")]
        public ActionResult RemoveBook([FromBody] InputModel postData)
        {
            try
            {
                bookCatalog.RemoveBook(postData.uuid);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }


    }



}