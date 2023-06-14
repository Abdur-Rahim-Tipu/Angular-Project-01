using LibraryManagementApi.Models;
using LibraryManagementApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly LibraryDbContext db;
        public StudentsController(LibraryDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await db.Students.ToListAsync();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<StudentVM>>> GetStudentViewModels()
        {
            return await db.Students
                .Select(s=>new StudentVM
                {
                    StudentId = s.StudentId,
                    Name=s.Name,
                    BookBorrowCount = db.BookIssues.Where(bi => bi.StudentId == s.StudentId && !bi.ActualReturnDate.HasValue).Count(),
                })
                .ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudnt(Student student)
        {
            await db.Students.AddAsync(student);
            await db.SaveChangesAsync();
            return student;
        }
    }
}
