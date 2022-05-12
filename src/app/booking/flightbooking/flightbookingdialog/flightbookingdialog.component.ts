import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FlightBookingUser } from 'src/app/_models/flight-booking-user.model';
import { FlightBookingmodel } from 'src/app/_models/flight-bookingmodel.model';
import { FlightbookingService } from 'src/app/_services/flightbooking.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlightbookingComponent } from '../flightbooking.component';

@Component({
  selector: 'app-flightbookingdialog',
  templateUrl: './flightbookingdialog.component.html',
  styleUrls: ['./flightbookingdialog.component.css']
})
export class FlightbookingdialogComponent implements OnInit {

  bookingForm:FormGroup;
  genderFormControl = new FormControl('0');
  mealFormControl = new FormControl('1');
  totalAmount=0;
  ticketCostAmt=0;
  tempDiscountId=0;
  appyDiscountError:string;
  tempDiscountCost:number=0;

  userDetailsArray: Array<any>=[];
  //flightBookingUserModel=new FlightBookingUser();

  flightBookingModel=new FlightBookingmodel();
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','email','gender','age','seatnumber','meal','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  genderArray:string[]=["Male","Female"];


  constructor(@Inject(MAT_DIALOG_DATA) public editBookingData:any,
  private toaster:ToastrService,
  private formBuilder:FormBuilder,
  private flightBookingService:FlightbookingService,
  private dialogRef:MatDialogRef<FlightbookingComponent>) { }

  ngOnInit(): void {

    this.bookingForm=this.formBuilder.group({

      userNameFormControl:['',Validators.required],
      emailFormControl:['',Validators.required],
      genderFormControl:['',Validators.required],
      ageFormControl:['',Validators.required],
      seatNoFormControl:['',Validators.required],
      mealFormControl:['',Validators.required],
      discountCodeFormControl:['']
    });


    console.log("Flight Booking edit data : "+JSON.stringify(this.editBookingData));
    if(this.editBookingData)
    {
      this.flightBookingModel.FlightId=parseInt(this.editBookingData.flightId);
      this.flightBookingModel.DiscountId=0;
      this.flightBookingModel.ClassStatus=parseInt(this.editBookingData.classStatus);
      this.flightBookingModel.Journey=parseInt(this.editBookingData.journeyType);
      this.flightBookingModel.UserId=1;
      this.ticketCostAmt=parseInt(this.editBookingData.ticketCost);
    }

  }


  AddBookUserDetails()
  {

    if(!this.bookingForm.valid)
    {
      this.toaster.warning("Data not valid for save.");
      return;
    }

    var flightBookingUserModel=new FlightBookingUser();
    flightBookingUserModel.UserName=this.bookingForm.value.userNameFormControl;
    flightBookingUserModel.UserEmail=this.bookingForm.value.emailFormControl;
    flightBookingUserModel.Gender=parseInt(this.bookingForm.value.genderFormControl);
    flightBookingUserModel.Age=parseInt(this.bookingForm.value.ageFormControl);
    flightBookingUserModel.SeatNumber=parseInt(this.bookingForm.value.seatNoFormControl);
    flightBookingUserModel.Meal=parseInt(this.bookingForm.value.mealFormControl);

      console.log("XX : "+JSON.stringify(flightBookingUserModel));
    
    this.userDetailsArray.push(flightBookingUserModel);

    this.dataSource = new MatTableDataSource(this.userDetailsArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log("Array : "+JSON.stringify(this.userDetailsArray));

    this.updateAmount(); //Update total amount

    this.bookingForm.reset();
  }

  SaveFlightBookingDetails()
  {

    if(this.userDetailsArray.length==0)
    {
      this.toaster.warning("Please add user details!!");
      return;
    }
    var userIdTemp=localStorage.getItem('sessionUserId');
    console.log("Parse UserId :"+parseInt(userIdTemp==null?"0":userIdTemp));

     console.log("First : "+JSON.stringify(this.flightBookingModel));
     this.flightBookingModel.DiscountId=this.tempDiscountId;
     this.flightBookingModel.UserId=parseInt(userIdTemp==null?"0":userIdTemp);
     this.flightBookingModel.userBookingDetailsRequestList=this.userDetailsArray;

     console.log("With User Info : "+JSON.stringify(this.flightBookingModel));
     this.flightBookingService.InsertFlightBookingDetails(this.flightBookingModel).subscribe({
       next:(res)=>{
          console.log("Ret Next : "+JSON.stringify(res));
          this.toaster.success("Successfully flight booked.")
          this.dialogRef.close('save');
       },
       error:(e)=>
       {
         console.log("Failed To delete : "+e);
       }
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  RemoveUserDetails(userdetailRow:any)
  {
    console.log("User Details : "+JSON.stringify(userdetailRow));
   const index = this.userDetailsArray.findIndex(item => item.UserName == userdetailRow.UserName && item.UserEmail==userdetailRow.UserEmail);
    console.log("Index : "+index);
    this.userDetailsArray.splice(index, 1); 
    console.log("Afere delete : "+JSON.stringify(this.userDetailsArray));
    this.dataSource = new MatTableDataSource(this.userDetailsArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.updateAmount(); //Update total amount
  }

  resolveEnumGender(num: number) {
    var result="";
    if(num == 0) 
    result= "Male";
   else if(num==1)
    {
      result= "Female";
    } 
    return result;
  }

  resolveEnumMeal(num: number) {
    var result="";
    if(num == 0) 
    result= "none";
   else if(num==1)
    {
      result= "Veg";
    } 
    else if(num==2)
    {
      result="Non-Veg";
    }
    return result;
  }

  updateAmount()
  {
    console.log("UP : "+this.tempDiscountCost);

    if(this.userDetailsArray.length==0)
    {
      this.tempDiscountCost=0;
    }
    
    this.totalAmount=(this.ticketCostAmt*this.userDetailsArray.length)-this.tempDiscountCost;
  }



  AppyDiscount()
  {
    var discountCode=this.bookingForm.value.discountCodeFormControl;
    console.log("Disocunt Code : "+discountCode);

    this.flightBookingService.GetDiscountsDetails(discountCode).subscribe({
      next:(res)=>{
         console.log("DDDS : "+res.discountsResponsesLists.length);
         if(res.discountsResponsesLists.length==0)
         {
            this.toaster.error("Invalid promo code...Enter a valid one.");
           return;
         }
        var res2=JSON.stringify(res.discountsResponsesLists[0].discountId); 
        this.tempDiscountId=parseInt(JSON.stringify(res.discountsResponsesLists[0].discountId));
        console.log("tempDiscountId : "+this.tempDiscountId);
        
        this.tempDiscountCost=parseInt(JSON.stringify(res.discountsResponsesLists[0].discountCost));
        console.log("tempDiscountCost : "+this.tempDiscountCost);
        this.appyDiscountError="Discount apply successfully";
        this.updateAmount(); 
     },
     error:(e)=>
     {
       console.log("Failed To delete : "+e);
     }
    });


  }
 

}
