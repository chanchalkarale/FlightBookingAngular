import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllHttpUrls } from '../Common/AllUrl';
import { LoginRequest } from '../_models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private myhttp:HttpClient) { }
  
  listLoginData:LoginRequest=new LoginRequest();//for post data
   allHttpUrls:AllHttpUrls=new AllHttpUrls();
  Login()
  {
    console.log("Call Login service function");
     return this.myhttp.post(this.allHttpUrls.loginUrl,this.listLoginData);
  }





}
