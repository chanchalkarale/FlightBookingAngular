import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private serviceAuth:AuthService,private router:Router){}
  canActivate()
     {
       if(this.serviceAuth.IsLoggedIn())
       {
        console.log('canactivate true');
        console.log('can activate token :'+localStorage.getItem('token'));
        return true;
       }
       else
       {
            console.log('canactivate false');
            console.log('can activate token f :'+localStorage.getItem('token'));
            this.router.navigate(['login']);
         return false;
       }
  }
  
}
