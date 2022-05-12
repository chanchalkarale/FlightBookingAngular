import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DiscountDetails } from 'src/app/_models/discount-details.model';
import { AirlineService } from 'src/app/_services/airline.service';
import { DiscountComponent } from '../discount.component';

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.css']
})
export class DiscountDialogComponent implements OnInit {
  discountForm:FormGroup;
  discountModel=new DiscountDetails();
  discountId=0;
  btnTxt:string='Save';

  constructor(private formBuilder:FormBuilder,
    private airlineService:AirlineService,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public editDiscountData:any,
    private dialogRef:MatDialogRef<DiscountComponent>) { }

  ngOnInit(): void {
    this.discountForm=this.formBuilder.group({
      discountCode:['',Validators.required],
      discountCost:['',Validators.required],
      expiryDate:['',Validators.required]
    });
    if(this.editDiscountData)
    {
      this.discountForm.controls['discountCode'].setValue(this.editDiscountData.discountCode);
      this.discountForm.controls['discountCost'].setValue(this.editDiscountData.discountCost);
      this.discountForm.controls['expiryDate'].setValue(this.editDiscountData.expiryDate);
      this.discountId=this.editDiscountData.discountId;
      this.btnTxt='Update';
    }
    console.log("Edit data : "+this.editDiscountData);
  }
  

  AddDiscount()
  {
    if(this.discountForm.valid)
    {
      this.discountModel.DiscountId=this.discountId;
      this.discountModel.DiscountCost=this.discountForm.value.discountCost;
      this.discountModel.DiscountCode=this.discountForm.value.discountCode;
      this.discountModel.ExpiryDate=this.discountForm.value.expiryDate;

      this.airlineService.AddDiscount(this.discountModel)
      .subscribe({
        next:(res)=>{
          if(this.btnTxt==='Save')
          {
            this.toaster.success("Discount added successfully."); 
          }
          else
          {
            this.toaster.success("Discount updated successfully."); 
          }
          this.discountForm.reset(); 
            this.discountId=0;
            this.dialogRef.close('save');

        },
        error:(err)=>
        {
          console.log(JSON.stringify(err));
          this.toaster.error("Failed to add Discount." +JSON.stringify(err));
        }
      });
    }
    else
    {
      this.toaster.warning("Data not valid for save.")
    }
  }

}
