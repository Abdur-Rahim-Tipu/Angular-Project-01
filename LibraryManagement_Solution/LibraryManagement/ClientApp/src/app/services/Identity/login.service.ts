import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Login } from 'src/app/models/Identity/login';
import { User } from 'src/app/models/Identity/user';
import { apiUrl } from 'src/app/models/shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData:User | null = null;
  @Output() loginEvent:EventEmitter<string> = new EventEmitter<string>();
   constructor(private http: HttpClient) { }
   login(data: Login) {
     return this.http.post<any>(`${apiUrl}/api/Account/Login`, data)
     .pipe(
       map((x) => {
         //console.log(x);
         const payload = JSON.parse(window.atob(x.token.split('.')[1]));
         //console.log(payload)
         let user:User = {username:payload.username,token:x.token, role:payload.role};
         this.save(user);
         this.userData = this.getUser();
         this.loginEvent.emit('login');
         return user;
       }),catchError(err=>{
         this.userData=null;
         console.log(err);
         return throwError(()=>err);
       }) 
     );
   }
   save(data:User){
     console.log(data);
     sessionStorage.setItem('user-data',JSON.stringify(data) );
   }
   getUser():User|null{
     let savedData = sessionStorage.getItem('user-data' );
     if(savedData){
       let user:User = JSON.parse(savedData) as User;
      // console.log(user)
       return user
     }
     else{
       return null;
     }
   }
   logout(){
     sessionStorage.removeItem('user-data');
     this.userData=null;
     this.loginEvent.emit('logout');
   }
   get emiter(){
     return this.loginEvent;
   }
}
