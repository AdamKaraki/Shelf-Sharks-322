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
        public ActionResult<ICollection<Book>> SearchBooks([FromQuery] string query)
        {
            try
            {
                return Ok(bookCatalog.SearchBooks(query));
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

        [HttpPost("/checkout")]
        public ActionResult CheckOutBook([FromBody] Guid uuid)
        {
            try
            {
                bookCatalog.CheckOutBook(uuid);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/return")]
        public ActionResult ReturnBook([FromBody] Guid uuid)
        {
            try
            {
                bookCatalog.ReturnBook(uuid);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/add")]
        public ActionResult AddBook([FromBody] Int64 isbn)
        {
            try
            {
                bookCatalog.AddBook(isbn);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/remove")]
        public ActionResult RemoveBook([FromBody] Int64 isbn)
        {
            try
            {
                bookCatalog.RemoveBook(isbn);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }


    }



}