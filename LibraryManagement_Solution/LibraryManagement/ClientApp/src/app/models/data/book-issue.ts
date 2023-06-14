export interface BookIssue {
    bookIssueId?:number;
    bookId?:number;
    studentId?:number;
    issueDate?:Date|string;
    returnDate?:Date|string;
    actualReturnDate?:Date
}
