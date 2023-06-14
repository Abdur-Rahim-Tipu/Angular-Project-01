import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { BookVM } from 'src/app/models/view-models/book-vm';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookService } from 'src/app/services/data/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:BookVM[]=[];
  dataSource:MatTableDataSource<BookVM> = new MatTableDataSource(this.books);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  columns=['title', 'author', 'price', 'isFree', 'actions'];
  constructor(
    private bookService:BookService,
    private notifyService:NotifyService
    ){}
  onSlectionChange(event:any){
    if(event.value=='Free'){
      this.dataSource.data = this.books.filter(v=> v.isFree);
    }
    else if(event.value=='Free'){
      this.dataSource.data = this.books.filter(v=> !v.isFree);
    }
    else{
     
        this.dataSource.data = this.books;
      
    }
  }
  ngOnInit(): void {
    this.bookService.getWithStatus()
    .subscribe({
      next:r=>{
        this.books=r;
        this.dataSource.data = this.books;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator
        //console.log(this.books)
      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to load books", "DISMISS");
        throwError(()=> err.message||err);
      }
    });
  }
}
