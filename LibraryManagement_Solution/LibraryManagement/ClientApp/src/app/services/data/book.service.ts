import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { BookVM } from 'src/app/models/view-models/book-vm';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  get():Observable<Book[]>
  {
    return this.http.get<Book[]>(`${apiUrl}/api/Books`)
  }
  getWithStatus():Observable<BookVM[]>
  {
    return this.http.get<BookVM[]>(`${apiUrl}/api/Books/WithStatus`)
  }
  getById(id:number):Observable<Book> {
    return this.http.get<Book>(`${apiUrl}/api/Books/${id}`)
  }
  post(data:Book):Observable<Book>{
    return this.http.post<Book>(`${apiUrl}/api/Books`, data);
  }
  put(data:Book):Observable<any>{
    console.log(data);
    return this.http.put<Book>(`${apiUrl}/api/Books/${data.bookId}`, data);
  }
}
