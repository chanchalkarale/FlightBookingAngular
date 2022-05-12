import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import{AppComponent} from '../app.component'; 
import { LoginRequest } from '../_models/login-request.model';
import { AuthService } from '../_services/auth.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  errorMsg:string;
  responseData:any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private app:AppComponent,
    public loginService:LoginService,
    private serviceAuth:AuthService,
    private toaster:ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   
  }
   loginReq=new LoginRequest;
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   onSubmit() {
     if(this.loginForm.valid)
     {
      this.loginReq.Username=this.loginForm.value.username;
      this.loginReq.Password=this.loginForm.value.password;
       console.log("ss : "+this.loginForm.value.username);
       this.serviceAuth.proceedLogin(this.loginReq).subscribe(result=>{
         if(result!=null)
         {
            this.responseData=result;
            console.log("Token : "+result);
            localStorage.setItem('token',this.responseData);
            var role=this.serviceAuth.HaveAccess(); 

            var userIdTemp=localStorage.getItem('sessionUserId');
           console.log("Parse UserId :"+parseInt(userIdTemp==null?"0":userIdTemp));

            this.loginForm.reset();
            this.router.navigate(['home']);
            this.toaster.success("Login success");
            //console.log("Token : "+result);
         }
         else
         {
          
         } 
         
       },
       error => {
        this.errorMsg="Please enter valid username and password";
        this.toaster.error("Please enter valid username and password");
        console.log("ERRR : "+JSON.stringify(error));
      },);
     }
    // this.errorMsg="";
    // console.log("On Click Submit Login.....");
   
    //   this.submitted = true;

    //   // stop here if form is invalid
    //   if (this.loginForm.invalid) {
    //       return;
    //   }
    //     console.log("First Name :"+this.loginForm.value.username);
    //   this.loading = true;
    //    //this.router.navigate(['admin']);
    //   console.log("Return urll : "+this.returnUrl);
    //   this.app.isAuthenticated=false;
    //   this.loginService.Login()
    //       .pipe(first())
    //       .subscribe(
    //           data => {
    //               console.log("Return data : "+data);
    //               if(data)
    //               {
    //                 this.router.navigate(['admin']);
    //               }
    //               else
    //               {
    //                 this.submitted =false;
    //                 this.loading=false;
    //                 this.errorMsg="* Please enter valid username and password";
    //                 this.router.navigate(['login']);
    //               }
    //           },
    //           error => {
    //               //this.alertService.error(error);
    //               console.log("login error");
    //               this.loading = false;
    //           });
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

}
