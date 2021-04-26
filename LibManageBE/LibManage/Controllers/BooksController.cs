using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibManage.Models;
using LibManage.Services;

namespace LibManage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookService _service;
        public BooksController(BookService service)
        {
            _service = service;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _service.GetAll();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            return await _service.Get(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            book.Id = id;
            await _service.Update(book);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            await _service.Add(book);
            return Ok();
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var b = await _service.Delete(id);
            if (b == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
