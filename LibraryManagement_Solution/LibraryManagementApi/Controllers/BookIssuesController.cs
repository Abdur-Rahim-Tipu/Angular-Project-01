using LibraryManagementApi.Models;
using LibraryManagementApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.X86;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookIssuesController : ControllerBase
    {
        private readonly LibraryDbContext db;
        public BookIssuesController(LibraryDbContext db) {  this.db = db; }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookIssue>>> GetBookIssues()
        {
            return await db.BookIssues.ToListAsync();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<BookIssueVM>>> GetBookIssueVMs()
        {
            return await db
                .BookIssues
                
                .Select(bi => new BookIssueVM
                {
                    BookIssueId=bi.BookIssueId,
                    BookId=bi.BookId,
                    Title   =   bi.Book == null ? "": bi.Book.Title,
                    StudentId = bi.StudentId,
                    StudentName = bi.Student == null ? "": bi.Student.Name,
                    IssueDate = bi.IssueDate,
                    ReturnDate = bi.ReturnDate,
                    ActualReturnDate = bi.ActualReturnDate

                })
                .ToListAsync();
        }
        [HttpGet("Edit")]
        public async Task<ActionResult<IEnumerable<BookIssueEditModel>>> GetBookIssueEditModels()
        {
            return await db
                .BookIssues

                .Select(bi => new BookIssueEditModel
                {
                    BookIssueId=bi.BookIssueId,
                    BookId = bi.BookId,
                    Title = bi.Book == null ? "" : bi.Book.Title,
                    StudentId = bi.StudentId,
                    StudentName = bi.Student == null ? "" : bi.Student.Name,
                    IssueDate = bi.IssueDate,
                    ReturnDate = bi.ReturnDate,
                    ActualReturnDate = bi.ActualReturnDate,
                    InEdit = false

                })
                .ToListAsync();
        }
        [HttpGet("VM/{id}")]
        public async Task<ActionResult<IEnumerable<BookIssueVM>>> GetBookIssueVM(int id)
        {
            return await db
                .BookIssues
                .Where(bi => bi.StudentId == id)
                .Select(bi => new BookIssueVM
                {
                    BookIssueId = bi.BookIssueId,
                    BookId = bi.BookId,
                    Title = bi.Book == null ? "" : bi.Book.Title,
                    StudentId = bi.StudentId,
                    StudentName = bi.Student == null ? "" : bi.Student.Name,
                    IssueDate = bi.IssueDate,
                    ReturnDate = bi.ReturnDate,
                    ActualReturnDate = bi.ActualReturnDate

                })
                .ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<BookIssue>>> PostBookIssues(BookIssue[] data)
        {
            await db.BookIssues.AddRangeAsync(data);
            await db.SaveChangesAsync();
            return data.ToList();
        }
        [HttpGet("Remaining/{id}")]
        public async Task<ActionResult<int>> GetBookAssinnableCount(int id)
        {
            var issues = await db.BookIssues.Where(bi=> bi.StudentId == id && !bi.ActualReturnDate.HasValue).ToListAsync();
            return 4-issues.Count();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BookIssueEditModel>> PutBookIssue(BookIssueEditModel data)
        {
            var bi = await db.BookIssues.FirstOrDefaultAsync(x => x.BookIssueId==data.BookIssueId);
            if (bi == null) return NotFound();
            bi.ActualReturnDate = data.ActualReturnDate;
            await db.SaveChangesAsync();
            return data;
        }



    }
}
