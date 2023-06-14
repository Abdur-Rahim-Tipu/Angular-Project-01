import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookIssue } from 'src/app/models/data/book-issue';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { BookIssueEditModel } from 'src/app/models/view-models/book-issue-edit-model';
import { BookIssueVM } from 'src/app/models/view-models/book-issue-vm';

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {

  constructor(private http:HttpClient) { }
  getVMs():Observable<BookIssueVM[]>{
    return this.http.get<BookIssueVM[]>(`${apiUrl}/api/BookIssues/VM`)
  }
  getEditModels():Observable<BookIssueEditModel[]>{
    return this.http.get<BookIssueEditModel[]>(`${apiUrl}/api/BookIssues/Edit`)
  }
  getVMsOfStudent(id:number):Observable<BookIssueVM[]>{
    return this.http.get<BookIssueVM[]>(`${apiUrl}/api/BookIssues/VM/${id}`)
  }
  post(data:BookIssue[]):Observable<BookIssue[]>{
    return this.http.post<BookIssue[]>(`${apiUrl}/api/BookIssues`, data)
  }
  getGetRemianingAssignable(id:number):Observable<number>{
    return this.http.get<number>(`${apiUrl}/api/BookIssues/Remaining/${id}`)
  }
  put(data:BookIssueEditModel):Observable<BookIssueEditModel>{
    return this.http.put<BookIssueEditModel>(`${apiUrl}/api/BookIssues/${data.bookIssueId}`, data)
  }
}
