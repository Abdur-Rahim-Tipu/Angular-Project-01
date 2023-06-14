import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { MatImportModule } from './modules/mat-import/mat-import.module';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BookService } from './services/data/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyService } from './services/common/notify.service';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentCreateComponent } from './components/student/student-create/student-create.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { BookIssueMainComponent } from './components/book-isssue/book-issue-main/book-issue-main.component';
import { BookIssueService } from './services/data/book-issue.service';
import { DatePipe } from '@angular/common';
import { BookBorrowListComponent } from './components/book/book-borrow-list/book-borrow-list.component';
import { BookReturnComponent } from './components/book-isssue/book-return/book-return.component';
import { UserService } from './services/Identity/user.service';
import { LoginService } from './services/Identity/login.service';
import { LoginComponent } from './Components/Identity/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListComponent,
    BookCreateComponent,
    BookEditComponent,
    HomeComponent,
    StudentListComponent,
    StudentCreateComponent,
    StudentEditComponent,
    BookIssueMainComponent,
    BookBorrowListComponent,
    BookReturnComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatImportModule,
    NgMaterialMultilevelMenuModule,
    HttpClientModule
  ],
  providers: [DatePipe, MultilevelMenuService, UserService,LoginService, HttpClient,NotifyService, BookService, BookIssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
