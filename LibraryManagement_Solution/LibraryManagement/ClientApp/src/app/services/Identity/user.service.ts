import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private loginSvc:LoginService) {
    this.loginSvc.loginEvent.subscribe(
      v =>{
        if(v== 'login') console.log('login');
        if(v== 'logout') console.log('logout');
      }
    )
   }
  get isLoggedin(){
    return this.loginSvc.getUser() !=null;
  }
  get Username(){
    return this.loginSvc.getUser()?.username;
  }
  get Role(){
    return this.loginSvc.getUser()?.role;
  }
  get Token(){
    return this.loginSvc.getUser()?.token;
  }
  signOut(){
    this.loginSvc.logout();
  }
  roleMatch(allow:string[]){
    let isMatch=false;
      allow.forEach(r=>{
        if(r== this.Role)
        {
          isMatch = true;
          
        }
      })
      return isMatch;
  }
}
