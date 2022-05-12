import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from './user-registration.model';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private myhttp:HttpClient) { }
  regUrl:string='http://localhost:33953/registration/register';
  listUserDetails:UserRegistration[]=[];
  listUserData1:any;
  
  listUserData:UserRegistration=new UserRegistration();//For post data /Insert Data

  saveUserRegData()
  {
    return  this.myhttp.post(this.regUrl,this.listUserData);
  }

  getUserReg():Observable<UserRegistration[]>
  {
      this.listUserData1=new UserRegistration();
    return this.myhttp.get<UserRegistration[]>(this.regUrl);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return   error(errMsg);
  }
}
