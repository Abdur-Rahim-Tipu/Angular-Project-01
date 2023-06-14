import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BookService } from 'src/app/services/data/book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent {
  book:Book = {};
  bookForm:FormGroup = new FormGroup ({
    
    title: new FormControl('', Validators.required), 
    author: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required, Validators.pattern(/^[0-9]*[.]?[0-9]{0,}$/)])
    
  });
  
  constructor(
    private bookService:BookService,
    private notifyService:NotifyService
  ){}
  get f(){
    return this.bookForm.controls;
  }
  save(){
    if(this.bookForm.invalid) return;
    Object.assign(this.book, this.bookForm.value);
   this.bookService.post(this.bookForm.value)
   .subscribe({
    next:r=>{
      this.book={};
      this.notifyService.notify("Book saved", "DISMISS");
      this.book ={};
      this.bookForm.reset({});
     
      this.bookForm.markAsUntouched();
      this.bookForm.markAsPristine();
    },
    error:err=>{
      this.notifyService.notify("Failed to save book", "DISMISS");
      throwError(()=> err.message||err);
    }
   });
  }
}
