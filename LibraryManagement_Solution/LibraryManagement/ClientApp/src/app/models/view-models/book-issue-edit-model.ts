export interface BookIssueEditModel {
    bookIssueId?:number;
    bookId?:number;
    title?:string;
    studentId?:number
    studentName?:string
    issueDate?:Date;
    returnDate?:Date;
    actualReturnDate?:Date;
    inEdit?:boolean;
}
