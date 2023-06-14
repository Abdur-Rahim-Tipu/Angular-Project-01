using LibraryManagementApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.ViewModels
{
    public class BookIssueVM
    {
        
        public int BookIssueId { get; set; }
        [Required, ForeignKey("Book")]
        public int BookId { get; set; }
        public string Title { get; set; } = default!;
        [Required, ForeignKey("Student")]
        public int StudentId { get; set; }
        public string StudentName { get; set; } = default!;
        [Required, Column(TypeName = "date")]
        public DateTime IssueDate { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }


    }
}
