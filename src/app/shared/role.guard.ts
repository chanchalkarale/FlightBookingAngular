import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private serviceAuth:AuthService,private route:Router){}
  canActivate()
     {
       if(this.serviceAuth.HaveAccess())
       {
         return true;
       }
       else
       {
         this.route.navigate(['home']);
          return false;
       }
  }
  
}
