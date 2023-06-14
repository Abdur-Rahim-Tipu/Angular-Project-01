import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { BookIssue } from 'src/app/models/data/book-issue';
import { BookVM } from 'src/app/models/view-models/book-vm';
import { StudentVM } from 'src/app/models/view-models/student-vm';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookIssueService } from 'src/app/services/data/book-issue.service';
import { BookService } from 'src/app/services/data/book.service';
import { StudentService } from 'src/app/services/data/student.service';

@Component({
  selector: 'app-book-issue-main',
  templateUrl: './book-issue-main.component.html',
  styleUrls: ['./book-issue-main.component.css']
})
export class BookIssueMainComponent implements OnInit {
 
  books:BookVM[] =[];
  students:StudentVM[]=[];
  dataSource:MatTableDataSource<BookVM> = new MatTableDataSource(this.books);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  columns =['select', 'title', 'author', 'free'];
  selectedBooks:BookVM[] =[];
  //=================
  issueForm:FormGroup = new FormGroup({
    studentId: new FormControl(undefined, [Validators.required]),
    issueDate: new FormControl(undefined, Validators.required),
    returnDate: new FormControl(undefined, Validators.required)
  });
  bookIssue:BookIssue={};
  constructor(
    private bookService:BookService,
    private studentService:StudentService,
    private bookIssueService:BookIssueService,
    private notifyService:NotifyService,
    private datePipe:DatePipe
  ){
    
    
  }
  get f(){
    return this.issueForm.controls;
  }
  save(){
    if(this.issueForm.invalid) return;
    Object.assign(this.bookIssue, this.issueForm.value);
    this.bookIssue.issueDate= formatDate(<Date>this.bookIssue.issueDate, "yyyy-MM-dd","en-US");
    this.bookIssue.returnDate= formatDate(<Date>this.bookIssue.returnDate, "yyyy-MM-dd","en-US");
    this.checkIfAssignable(<number>this.bookIssue.studentId);
    /*  */
    }
    checkIfAssignable(id:number){
      this.bookIssueService.getGetRemianingAssignable(id)
      .subscribe({
        next: r=>{
            if(r< this.selectedBooks.length){
              this.notifyService.notify("Cannot assign more than 4 books to a student","DISMISS");
            }
            else{
              this.saveIssues();
            }
        }
      })
    }
    saveIssues(){
      let data:BookIssue[] =[]
      this.selectedBooks.forEach(v=>{
          
          data.push({studentId: this.bookIssue.studentId, bookId:v.bookId, issueDate:this.bookIssue.issueDate, returnDate:this.bookIssue.returnDate})
      });
      console.log(data);
      this.bookIssueService.post(data)
      .subscribe({
        next:r=>{
          this.notifyService.notify("Data saved", "DISMISS");
          this.bookIssue={};
          this.issueForm.reset({});
          this.issueForm.markAsPristine();
          this.issueForm.markAsUntouched();
          this.selectedBooks=[];
          this.loadBooks();
    this.loadStudents();
        },
        error:err=>{
          this.notifyService.notify("Failed to save book issues", "DISMISS");
          throwError(()=>err.message || err);
        }
      })
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChange(event:MatCheckboxChange, data:BookVM){
    if(event.checked){
      if(this.selectedBooks.length>1){
        this.notifyService.notify("Cannot assign more than 2 books a time", "DISMISS");
         //console.log(event.source.checked)
         event.source.checked=false;
      }
      else{
        this.selectedBooks.push(data);
      }
    }
    else{
      let i = this.selectedBooks.findIndex(x=> x.bookId == data.bookId);
      if(i>=0){
        this.selectedBooks.splice(i, 1);
      }
    }
    //console.log(this.selectedBooks)
  }
  loadBooks(){
    this.bookService.getWithStatus()
    .subscribe({
      next:r=>{
        this.books = r;
        this.dataSource.data = this.books;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator
      },
      error:err=>{
        this.notifyService.notify("Failed to load books", "DISMISS");
        throwError(()=>err.message || err);
      }
    });
  }
  isAssignable(s:StudentVM){
    if(s){
      return Number(s.bookBorrowCount)> 3;
    }
    return false;
  }
  onSelectionChange(event:any){
    console.log(event.value);
  }
  onDateChange(event:any){
    console.log('chnage')
    let d1 =this.f['issueDate'].value;
    let d2 = this.f['returnDate'].value;
    if(d1>=d2){
      console.log('Not greater')
      this.f['returnDate'].setErrors({
        notGreater: 'Return date should > issue date'
      })
    }
  }
  loadStudents(){
    this.studentService.getVM()
    .subscribe({
      next:r=>{
        this.students=r;
      },
      error:err=>{
        this.notifyService.notify("Failed to load students", "DISMISS");
        throwError(()=>err.message || err);
      }
    })
  }
  ngOnInit(): void {
    this.loadBooks();
    this.loadStudents();
  }
}
