namespace LibraryManagementApi.ViewModels
{
    public class StudentVM
    {
        public int StudentId { get; set; }
        public string Name { get; set; } = default!;
        public int BookBorrowCount { get; set; } = default!;
    }
}
