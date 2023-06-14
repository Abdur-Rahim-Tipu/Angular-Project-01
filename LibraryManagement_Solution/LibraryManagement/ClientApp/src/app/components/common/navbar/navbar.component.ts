import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { navItems } from 'src/app/models/shared/app-constants';
import { UserService } from 'src/app/services/Identity/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true
    
};
itemsNav=navItems
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      private breakpointObserver: BreakpointObserver,
      private userService:UserService
      ) {}
       get isLoggedIn(){
        return this.userService.isLoggedin;
       }
       get userName(){
        return this.userService.Username;
       }
       logout(){
        this.userService.signOut();
       }

}
