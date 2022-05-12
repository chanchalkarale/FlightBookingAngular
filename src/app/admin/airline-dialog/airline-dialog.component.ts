import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AirlineNames } from 'src/app/_models/airline-names.model';
import { AirlineService } from 'src/app/_services/airline.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-airline-dialog',
  templateUrl: './airline-dialog.component.html',
  styleUrls: ['./airline-dialog.component.css']
})
export class AirlineDialogComponent implements OnInit {
  airlineForm:FormGroup;
  arilineNames=new AirlineNames();
  constructor(private formBuilder:FormBuilder,
        private airlineService:AirlineService,
        private toaster:ToastrService,
        @Inject(MAT_DIALOG_DATA) public editData:any,
        private dialogRef:MatDialogRef<AirlineDialogComponent>) { }
  
  ngOnInit(): void {
   this.airlineForm=this.formBuilder.group({
     airlineName:['',Validators.required],
     airlineStatus:['']
   });

   console.log("Edit data : "+this.editData);
  }
  
  AddAirline()
  {
    console.log("Click aadd ariline");
    console.log(this.airlineForm.value);
    if (this.airlineForm.valid)
    {
      this.arilineNames.AirlineNmae=this.airlineForm.value.airlineName;
      this.airlineService.AddAirlineNames(this.arilineNames)
      .subscribe({
        next:(res)=>{
          this.toaster.success("Airline added successfully.");
          this.airlineForm.reset(); 
          this.dialogRef.close('save');
        },
        error:(err)=>
        {
          this.toaster.error("Failed to Add airline.");
        }
      });
    }

  }

}
 
