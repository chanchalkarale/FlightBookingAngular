import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FlightSearchRequest } from 'src/app/_models/flight-search-request.model';
import { FlightbookingService } from 'src/app/_services/flightbooking.service';
import { FlightbookingdialogComponent } from './flightbookingdialog/flightbookingdialog.component';

@Component({
  selector: 'app-flightbooking',
  templateUrl: './flightbooking.component.html',
  styleUrls: ['./flightbooking.component.css']
})
export class FlightbookingComponent implements OnInit {

  searchForm:FormGroup;
  flightSearchReq=new FlightSearchRequest();
  floatLabelControl = new FormControl('0');
  date = new Date((new Date().getTime()));
  tempJourneyType:any;

  returndate = new Date((new Date().getTime() + 188800000));
   
  displayedColumns: string[] = ['airline','departure','arrival','price','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
              private toaster:ToastrService,
              private flightBookingService:FlightbookingService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({ 
      
      Journey:this.floatLabelControl,
      fromPlaceControl:['',Validators.required],
      toPlaceControl:['',Validators.required],
      depatureControl:['',Validators.required],
      returnDateControl:[''],
      seatsClassControl:['']
    });
 
  }


  Search()
  {
    if(this.searchForm.valid)
    {
      this.tempJourneyType=this.flightSearchReq.JourneyType=this.searchForm.value.Journey;
      this.flightSearchReq.FromPlace=this.searchForm.value.fromPlaceControl;
      this.flightSearchReq.ToPlace=this.searchForm.value.toPlaceControl;
      this.flightSearchReq.DepartureDate=this.searchForm.value.depatureControl;
      this.flightSearchReq.ReturnDate=this.searchForm.value.returnDateControl;
      this.flightSearchReq.seatsClass=this.searchForm.value.seatsClassControl;
      
      this.flightBookingService.GetSearchFlights(this.flightSearchReq)
       .subscribe({
         next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
            console.log("Res : "+JSON.stringify(res));
         },
         error:(e)=>
         {
           console.log("Error : "+JSON.stringify(e));
         }
       });

    }
    else
    {
      alert("Invalid");
    }
    console.log("Search click :"+JSON.stringify(this.searchForm.value));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  BookTicket(flightId:any,classStatus:any,ticketCost:any)
  {
    console.log('Flight Id : ' +flightId);
    console.log('Class Seats : '+classStatus); //1=Economy and 2= Business
    console.log('Journey type : '+this.searchForm.value.Journey);

    var rawData={"flightId":flightId,"classStatus":classStatus,"journeyType":this.tempJourneyType,"ticketCost":ticketCost};
    this.dialog.open(FlightbookingdialogComponent, {
      disableClose:true,
      width:'60%',
      height:'100%',
      data:rawData
     }).afterClosed().subscribe(val=>{
       if(val==='save'){
         //this.GetAllDiscounts();
       }
     });
  }

  openBookingDialog() {
   
  }

}
