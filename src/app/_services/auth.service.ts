import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllHttpUrls } from '../Common/AllUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }
 // apiUrl='http://localhost:33953/registration/Login';
 public allHttpUrlObj=new AllHttpUrls();
 apiUrl=this.allHttpUrlObj.baseUrl+'registration/Login';
  proceedLogin(usercread:any)
  {
    return this.http.post(this.apiUrl,usercread,{ responseType: 'text'});
  }

  IsLoggedIn()
  {
    console.log("IsLoggedIn");
     if(localStorage.getItem('token')!=null)
     {
      console.log("IsLoggedIn T");
       return true;
     }
     else
     {
      console.log("IsLoggedIn F");
       return false;
     }
  }

  GetToken(){
    return localStorage.getItem('token')||'';
  }

  HaveAccess(){
    var loginToken=localStorage.getItem('token')||'';
    console.log("Final Data loginToken : "+loginToken);
    var _extractedToken=loginToken.split('.')[1];
    console.log("_extractedToken : "+_extractedToken);
    var _atodata=atob(_extractedToken);
    console.log("_atodata : "+_atodata);
    console.log("Role : "+_atodata);
    var _finalData=JSON.stringify(_atodata);
    console.log("_finalData x : "+_finalData);
    var _finalDatsa=JSON.parse(_finalData);
    console.log("_finalDatsa x : "+_finalDatsa);
    
    var _finalDatsa1=JSON.parse(_finalDatsa);
    console.log("_finalDatsa1 x : "+_finalDatsa1);

    console.log("Role x : "+_finalData);
    console.log("Final Data : "+_finalDatsa1.role);
    localStorage.setItem('roles',_finalDatsa1.role);
    localStorage.setItem('usersName',_finalDatsa1.unique_name);
    localStorage.setItem('sessionUserId',_finalDatsa1.primarysid);

    console.log('x X : '+localStorage.getItem('sessionUserId'));
    if(_finalDatsa1.role=='admin')
    {
      return true;
    }
    //alert('you not access this');
    return false;
     
  }
}

