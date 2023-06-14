using LibraryManagementApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.ViewModels
{
    public class BookVM
    {
        public int BookId { get; set; }
        [Required, StringLength(50)]
        public string Title { get; set; } = default!;
        [Required, StringLength(50)]
        public string Author { get; set; } = default!;
        [Required, Column(TypeName = "money")]
        public decimal Price { get; set; }
        public bool IsFree { get; set; }
        public virtual ICollection<BookIssue> BookIssues { get; set; } = new List<BookIssue>();
    }
}
