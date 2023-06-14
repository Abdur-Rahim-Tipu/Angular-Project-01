import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentCreateComponent } from './components/student/student-create/student-create.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { BookIssueMainComponent } from './components/book-isssue/book-issue-main/book-issue-main.component';
import { BookBorrowListComponent } from './components/book/book-borrow-list/book-borrow-list.component';
import { BookReturnComponent } from './components/book-isssue/book-return/book-return.component';
import { LoginComponent } from './Components/Identity/login/login.component';
import { AuthorGuard } from './Guards/author.guard';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'books', component:BookListComponent},
  {path: 'book-create', component:BookCreateComponent, canActivate: [AuthorGuard]},
  {path: 'book-edit/:id', component:BookEditComponent},
  {path: 'students', component:StudentListComponent},
  {path: 'student-create', component:StudentCreateComponent},
  {path: 'student-edit/:id', component:StudentEditComponent},
  {path: 'book-issue', component:BookIssueMainComponent},
  {path: 'book-return', component:BookReturnComponent},
  {path: 'borrows/:id', component:BookBorrowListComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
