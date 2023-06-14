import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookService } from 'src/app/services/data/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{
  book:Book = {};
  bookForm:FormGroup = new FormGroup ({
    
    title: new FormControl('', Validators.required), 
    author: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required, Validators.pattern(/^[0-9]*[.]?[0-9]{0,}$/)])
    
  });
  
  constructor(
    private bookService:BookService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  
  get f(){
    return this.bookForm.controls;
  }
  save(){
    if(this.bookForm.invalid) return;
    Object.assign(this.book, this.bookForm.value);
    console.log(this.book);
    this.bookService.put(this.book)
   .subscribe({
    next:r=>{
      
      this.notifyService.notify("Book saved", "DISMISS");
     
    },
    error:err=>{
      this.notifyService.notify("Failed to save book", "DISMISS");
      throwError(()=> err.message||err);
    } 
   });
   
  }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.bookService.getById(id)
    .subscribe({
      next: r=>{
        this.book=r;
        this.bookForm.patchValue(this.book);
      },
      error:err=>{
        this.notifyService.notify("Failed to load book", "DISMISS");
        throwError(()=> err.message||err);
      }
    });
  }
}
