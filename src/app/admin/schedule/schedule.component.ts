import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AirlineSchedule } from 'src/app/_models/airline-schedule.model';
//import { Airlines } from 'src/app/_models/airlines.model';
import { AirlineService } from 'src/app/_services/airline.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  airlines: [any];
  selectedAirline = 1;
  selectedMeal=1;
 // flightNumber='ÁIR23453';
  scheduleFormGrp: FormGroup;
  scheduleReq=new AirlineSchedule;
  disableAirlineDD=false;

	
  mealTypeArray = [
		{
      mealId:0,
		  mealType: 'none',
		},
		{
      mealId:1,
		  mealType: 'Veg',
		},
		{
      mealId:2,
		  mealType: 'Non-Veg',
		}];
  closeResult: string;
  selectControl: any;
 
	

  constructor(private airlineService:AirlineService,
      private formBuilder: FormBuilder,
      private toaster:ToastrService) { 
   }
    

  ngOnInit(): void {
    // call the method on initial load of page to bind dropdown   
      this.scheduleFormGrp = this.formBuilder.group({
        DDAirline:[''],
        flightNumber:[''],
        fromPlace: ['', Validators.required],
        toPlace: [''],
        departTime: [''],
        arrivalTime: [''],

        bussinessSeats: [''],
        ecoSeats: [''],
        bussinessCost: [''],
        ecoCost: [''],

        seatRows: [''],
        selMeal: [''], 
        
});
    this.GetAirline(); 
    this.GetAllAirlineFlightsDetails();
  }
  addTab:number=0;
  detailsTab:number=1;
  closeModal: string;
  OpenAddModal() {
      this.addTab =1;
      this.detailsTab =0; 
      this.disableAirlineDD=true;
  }

  Back()
  {
      this.addTab =0;
      this.detailsTab =1;
      this.disableAirlineDD=false;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

   
  
  GetAirline()
  {
    this.airlineService.GetAirlinesList().subscribe((data:any)=>{
      this.airlines=data; 
    }); 
  }
  flightData:any[];
  GetAllAirlineFlightsDetails()
  { 
    this.airlineService.GetAllAirlineFlightsDetails().subscribe((data:any)=>{ 
      console.log(data);
     this.flightData=data.airlineFlightDetailsResponsesList; 
     console.log(this.flightData);
    });
  }

  FillMealType()
  {

  }
 
  onSubmit() { 
    if (this.scheduleFormGrp.valid)
    { 
      this.scheduleReq.AirlineId=this.scheduleFormGrp.value.DDAirline;
      this.scheduleReq.FlightNumber=this.scheduleFormGrp.value.flightNumber;
      this.scheduleReq.FromPlaceName=this.scheduleFormGrp.value.fromPlace;
      this.scheduleReq.ToPlaceName=this.scheduleFormGrp.value.toPlace;

      this.scheduleReq.FlightStartDateTime=this.scheduleFormGrp.value.departTime;
      this.scheduleReq.FlightToDateTime=this.scheduleFormGrp.value.arrivalTime;

      this.scheduleReq.TotalBusinessSeats=this.scheduleFormGrp.value.bussinessSeats;
      this.scheduleReq.TotalNonBusinessSeats=this.scheduleFormGrp.value.ecoSeats;

      
      this.scheduleReq.BusTicketCost=this.scheduleFormGrp.value.bussinessCost;
      this.scheduleReq.NonBusTicketCost=this.scheduleFormGrp.value.ecoCost;

      this.scheduleReq.FlightSeatRow=this.scheduleFormGrp.value.seatRows;
      this.scheduleReq.Meal=this.scheduleFormGrp.value.selMeal;
       
     this.airlineService.InsertAirlineSchedule(this.scheduleReq).subscribe(data=>{
       if(data!=null)
       {
          //alert("Airline Added successfully");
          this.toaster.success("Airline flight record added successfully.");
          this.scheduleFormGrp.reset();
          this.GetAllAirlineFlightsDetails();
          this.Back(); //go back to list page
       }
       else
       {
        alert("Failed to Add airline");
       }
     });
    
    }
  } 

  EditFlightSchedule(flightData:any)
  {
 
   // this.GetAirline();
     
    //this.selectedAirline=flightData.selectedAirline;
    this.scheduleFormGrp.controls["DDAirline"].setValue(flightData.meal);
    this.scheduleFormGrp.controls["flightNumber"].setValue(flightData.flightNumber);
    this.scheduleFormGrp.controls["fromPlace"].setValue(flightData.fromPlaceName);
    this.scheduleFormGrp.controls["toPlace"].setValue(flightData.toPlaceName);

    this.scheduleFormGrp.controls["departTime"].setValue(flightData.flightStartDateTime);
    this.scheduleFormGrp.controls["arrivalTime"].setValue(flightData.flightToDateTime);

    this.scheduleFormGrp.controls["bussinessSeats"].setValue(flightData.totalBusinessSeats);
    this.scheduleFormGrp.controls["ecoSeats"].setValue(flightData.totalNonBusinessSeats);

    this.scheduleFormGrp.controls["bussinessCost"].setValue(flightData.busTicketCost);

    this.scheduleFormGrp.controls["ecoCost"].setValue(flightData.nonBusTicketCost);
    this.scheduleFormGrp.controls["seatRows"].setValue(flightData.flightSeatRow);
    this.scheduleFormGrp.controls["selMeal"].setValue(flightData.meal);
    this.OpenAddModal();
  }
  
  DeleteFlightSchedule(flightId:any)
  {
    this.airlineService.RemoveAirlineFlight(flightId).subscribe({
      next:(v)=>{
        if(v)
        {
          this.toaster.success("Airline flight record deleted successfully.");
        }
        else
        {
          this.toaster.error("Failed to delete.");
        }
        console.log("next :"+v);
      },
      error:(e)=>{
        console.log("error : "+e);
      },
      complete:()=>{
        console.log("Airline flight record deleted successfully");
       
        this.GetAllAirlineFlightsDetails();
        this.Back(); //go back to list page
      }
    }); 
  }


}
