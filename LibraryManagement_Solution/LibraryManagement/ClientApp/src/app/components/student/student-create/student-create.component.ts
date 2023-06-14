import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Student } from 'src/app/models/data/student';
import { NotifyService } from 'src/app/services/common/notify.service';
import { StudentService } from 'src/app/services/data/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  student:Student = {};
  studentForm:FormGroup = new FormGroup ({
    
    name: new FormControl('', Validators.required), 
    class: new FormControl('', Validators.required)
    
  });
  get f(){
    return this.studentForm.controls;
  }
  save(){
    if(this.studentForm.invalid) return;
    Object.assign(this.student, this.studentForm.value);
    this.studentService.post(this.student)
    .subscribe({
      next: r=>{
        this.notifyService.notify("Data saved", "DISMISS")
        this.student ={};
      this.studentForm.reset({});
     
      this.studentForm.markAsUntouched();
      this.studentForm.markAsPristine();
      },
      error:err=>{
        this.notifyService.notify("Failed to save student", "DISMISS");
        throwError(()=> err.message||err);
      }
    })
  }
  constructor(
    private studentService:StudentService,
    private notifyService:NotifyService
  ){}
}
