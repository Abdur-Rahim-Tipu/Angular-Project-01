import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { BookIssueEditModel } from 'src/app/models/view-models/book-issue-edit-model';
import { BookIssueVM } from 'src/app/models/view-models/book-issue-vm';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookIssueService } from 'src/app/services/data/book-issue.service';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.css']
})
export class BookReturnComponent implements OnInit {
  constructor(
    private booIssueServcie:BookIssueService,
    public notifyServcie:NotifyService,
    private datePipe:DatePipe
  ){}
  
  borrows:BookIssueEditModel[]=[];
  dataSource:MatTableDataSource<BookIssueVM> = new MatTableDataSource(this.borrows);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  columns=['studentName', 'title', 'issueDate', 'returnDate', 'actualReturnDate', 'actions'];
  editClick(data:BookIssueEditModel){
      data.inEdit=!data.inEdit;
  }
  onSlectionChange(event:any){
    if(event.value=='Returned'){
      this.dataSource.data = this.borrows.filter(v=> v.actualReturnDate);
    }
    else if(event.value=='Free'){
      this.dataSource.data = this.borrows.filter(v=> !v.actualReturnDate);
    }
    else{
     
        this.dataSource.data = this.borrows;
      
    }
  }
  onDateChange(event:any, data:BookIssueEditModel){
    let d= this.datePipe.transform(<Date>event.value, "yyyy-MM-dd","en-US");
    data.actualReturnDate=new Date(<string>d);
    console.log(data);
    this.booIssueServcie.put(data)
    .subscribe({
      next:r=>{
        let i = this.borrows.findIndex(bi => bi.bookIssueId == r.bookIssueId);
        this.borrows[i].actualReturnDate=r.actualReturnDate;
        this.borrows[i].inEdit=false;
        this.notifyServcie.notify("Data updated", "DISMISS");
      },
      
      error:err=>{
        this.notifyServcie.notify("Failed to update book issue list", "DISMISS");
        throwError(()=> err.message||err);
      }
    })
  }
  getActualDate(data:BookIssueEditModel){
    let dt= data.actualReturnDate ? data.actualReturnDate: new Date();
    console.log(dt);
    return dt;
  }
  
  ngOnInit(): void {
    this.booIssueServcie.getEditModels()
    .subscribe({
      next: r=>{
        this.borrows=r;
        console.log(this.borrows);
        this.dataSource.data = this.borrows;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator
      },
      error:err=>{
        this.notifyServcie.notify("Failed to load book issue list", "DISMISS");
        throwError(()=> err.message||err);
      }
    })
  }
}
