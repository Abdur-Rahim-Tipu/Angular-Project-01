import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifyService } from '../services/common/notify.service';
import { UserService } from '../services/Identity/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard  {
  constructor( 
    private router: Router,
    private userService: UserService,
    private notifyService:NotifyService
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.isLoggedin){
        return true;
      }
      else
      {
        this.notifyService.notify("You must login","DISMISS")
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
  }
  
}
