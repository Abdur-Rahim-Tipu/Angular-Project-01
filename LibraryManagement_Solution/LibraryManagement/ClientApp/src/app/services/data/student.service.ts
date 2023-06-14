import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/data/student';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { StudentVM } from 'src/app/models/view-models/student-vm';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  get():Observable<Student[]>{
    return this.http.get<Student[]>(`${apiUrl}/api/Students`);
  }
  getVM():Observable<StudentVM[]>{
    return this.http.get<StudentVM[]>(`${apiUrl}/api/Students/VM`);
  }
  getById(id:number):Observable<Student>{
    return this.http.get<Student>(`${apiUrl}/api/Students/${id}`);
  }
  post(data:Student):Observable<Student>{
    return this.http.post<Student>(`${apiUrl}/api/Students`,data);
  }
  
}
