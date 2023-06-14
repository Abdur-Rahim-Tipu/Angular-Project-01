using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementApi.Models
{
    public class Book
    {
       
        public int BookId { get; set; }
        [Required, StringLength(50)]
        public string Title { get; set; } = default!;
        [Required, StringLength(50)]
        public string Author { get; set; } = default!;
        [Required, Column(TypeName ="money")]
        public decimal Price { get; set; }
        public virtual ICollection<BookIssue> BookIssues { get; set; }=new List<BookIssue>();
        
    }
    public class Student
    {
       
        public int StudentId { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }=default!;
        [Required, StringLength(50)]
        public string Class { get; set; } = default!;
        public virtual ICollection<BookIssue> BookIssues { get; set; } = new List<BookIssue>();
    }
    public class BookIssue
    {
        public int BookIssueId { get; set; }
        [Required, ForeignKey("Book")]
        public int BookId { get; set; }
        [Required, ForeignKey("Student")]
        public int StudentId { get; set; }
        [Required, Column(TypeName ="date")]
        public DateTime IssueDate { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime ReturnDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ActualReturnDate { get; set; }
        public virtual Book? Book { get; set; }
        public virtual Student? Student { get; set; }
    }
    public class LibraryDbContext : DbContext
    {
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options) { }
        public DbSet<Book> Books { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<BookIssue> BookIssues { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookIssue>()
                .HasIndex(b => new{ b.BookId, b.StudentId }).IsUnique(true); 
        }
    }

}
