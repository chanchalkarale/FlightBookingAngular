import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 
import { UserRegistrationService } from 'src/app/User/user-registration.service';
import { UserRegistration } from 'src/app/User/user-registration.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
 
  matchPassword:boolean=true;
  constructor(public userRegService:UserRegistrationService,
    private toaster:ToastrService,private router: Router) { }

  ngOnInit(): void {
  }

  submit(form:NgForm)
  {
    this.matchPassword=true; 
    
    if(form.value.confirmPassword!=form.value.pass)
    {
      this.matchPassword=false;
      console.log("Password not match");
      return;
      
    } 

    this.InsertUserReg(form);
    console.log(form.value); 
  }
    
  InsertUserReg(myform:NgForm)
  {
    this.userRegService.saveUserRegData().subscribe({
      next:(v)=>{
        if(v)
        {
          this.router.navigate(['login']); 
          this.toaster.success("Successfully Register.");
        }
        else
        {
          this.toaster.error("Failed to register.");
        }
        console.log("next :"+v);
      },
      error:(e)=>{
        console.log("error : "+e);
      },
      complete:()=>{
        console.log("Successfully Register");
       
      }
    });
    // this.userRegService.saveUserRegData().subscribe(d=>{
    //       //this.resetForm(myform);
    //       //this.refreshData();
    //       console.log("save successfully");
          
    // });
  }

  resetForm(myform:NgForm)
  {
    myform.form.reset();
    this.userRegService.listUserData=new UserRegistration();
  }

  refreshData()
  {
    this.userRegService.getUserReg().subscribe(res=>{
      this.userRegService.listUserDetails=res;
    })
  }
}
