import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Student } from 'src/app/models/data/student';
import { NotifyService } from 'src/app/services/common/notify.service';
import { StudentService } from 'src/app/services/data/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  students:Student[] =[];
  dataSource:MatTableDataSource<Student> = new MatTableDataSource(this.students);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  columns=['name', 'class', 'borrows'];
  constructor(
    private studentService:StudentService,
    private notifyService:NotifyService
    ){}
  ngOnInit(): void {
    this.studentService.get()
    .subscribe({
      next:r=>{
        this.students=r;
        this.dataSource.data = this.students;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator
        //console.log(this.books)
      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to load students", "DISMISS");
        throwError(()=> err.message||err);
      }
    });
  }
}
