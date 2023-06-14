import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { BookIssueVM } from 'src/app/models/view-models/book-issue-vm';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookIssueService } from 'src/app/services/data/book-issue.service';

@Component({
  selector: 'app-book-borrow-list',
  templateUrl: './book-borrow-list.component.html',
  styleUrls: ['./book-borrow-list.component.css']
})
export class BookBorrowListComponent implements OnInit {
  
  borrows:BookIssueVM[]=[];
  dataSource:MatTableDataSource<BookIssueVM> = new MatTableDataSource(this.borrows);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  columns=['studentName', 'title', 'issueDate', 'returnDate', 'actualReturnDate'];
  constructor(
    private booIssueServcie:BookIssueService,
    public notifyServcie:NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
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
  ngOnInit(): void {
    let id:number=this.activatedRoute.snapshot.params['id']
    this.booIssueServcie.getVMsOfStudent(id)
    .subscribe({
      next: r=>{
        this.borrows=r;
        console.log(this.borrows)
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
