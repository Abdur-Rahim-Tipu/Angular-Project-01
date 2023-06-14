using LibraryManagementApi.Models;
using LibraryManagementApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryDbContext db;
        public BooksController(LibraryDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await db.Books.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await db.Books.FirstOrDefaultAsync( x=> x.BookId == id);
            if(book is null) return NotFound();
            else return book;
        }
        [HttpGet("WithStatus")]
        public async Task<ActionResult<IEnumerable<BookVM>>> GetBooksWithStatus()
        {
            return await db.Books
                .Select(b=> new BookVM
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    Price = b.Price,
                    Author = b.Author,
                    IsFree = !db.BookIssues.Any(x=> x.BookId == b.BookId && !x.ActualReturnDate.HasValue),
                })
                .ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            await db.Books.AddAsync(book);
            await db.SaveChangesAsync();
            return book;
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> PutBook(int id, Book book)
        {
            if (id != book.BookId) return BadRequest("Book ids dont match");
            db.Entry(book).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
