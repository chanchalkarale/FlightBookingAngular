import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlightbookingService } from '../_services/flightbooking.service';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { DialogServiceService } from '../_services/dialog-service.service';

@Component({
  selector: 'app-managebooking',
  templateUrl: './managebooking.component.html',
  styleUrls: ['./managebooking.component.css']
})
export class ManagebookingComponent implements OnInit {

  displayedColumns: string[] = ['airline', 'fromPlace','toplace','totalseat','cost','details','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userDetailsColumns: string[] = ['airlineName', 'name','ufromplace','utoplace','seatno','age','gender','meal','pnr','journey'];
  userDetailsdataSource: MatTableDataSource<any>;

  FirstTab=1;
  SecondTab=0;

  constructor(private flightBookingService:FlightbookingService,
    public dialog: MatDialog, 
    private toaster:ToastrService,
    private router: Router,
    private dialogConfirm: DialogServiceService) { }

  ngOnInit(): void {
    this.GetAllBookedTicket();
  }

   
  GetAllBookedTicket()
  {
    console.log("GetAllBookedTicket");

    var userIdTemp=localStorage.getItem('sessionUserId');
    var userId=parseInt(userIdTemp==null?"0":userIdTemp);
    console.log("Booked Ticket Parse UserId :"+userId);
    
    this.flightBookingService.GetAllBookedTickets(userId).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.bookedTicketDetailsResponsesList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error:(e)=>{
        this.toaster.error("Failed to load data.");
        this.router.navigate(['login']);
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

  applyFilterUserDetails(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDetailsdataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDetailsdataSource.paginator) {
      this.userDetailsdataSource.paginator.firstPage();
    }
  }


  CancelTicket(pnrNumber:any)
  {
    console.log("PNr Number For cancel ticket : "+pnrNumber);
    
    this.dialogConfirm
    .confirmDialog({
      title: 'Are you sure?',
      message: 'Are you sure you want to cancel flight ticket?',
      confirmCaption: 'Yes',
      cancelCaption: 'No',
    })
    .subscribe((yes) => {
      if (yes)
      {  
        console.log('The user said YES');
        this.flightBookingService.CancelBookedTicket(pnrNumber).subscribe({
          next:(res)=>{ 
            this.toaster.success("Successfully cancel ticket.");
            this.GetAllBookedTicket();
            console.log(res);
          },
          error:(e)=>{
            this.toaster.error("Failed to cancel data.");
            this.router.navigate(['login']);
          }
        });
      } 
    });
    
   
    
  }

  BookedTicketDetails(pnrNumber:any)
  { 
    console.log("PNR :"+pnrNumber); 
   
    
    this.flightBookingService.GetBookedTicketDetailsViaPNR(pnrNumber).subscribe({
      next:(res)=>{
        this.userDetailsdataSource = new MatTableDataSource(res.bookedTicketDetailsResponsesList);
        this.userDetailsdataSource.paginator = this.paginator;
        this.userDetailsdataSource.sort = this.sort;
        this.FirstTab=0;
        this.SecondTab=1; 
        console.log(res);
        
      },
      error:(e)=>{
        this.toaster.error("Failed to load data.");
        this.router.navigate(['login']);
      }
    }); 

  }

  Back()
  {
    
    this.FirstTab=1;
    this.SecondTab=0;
    this.GetAllBookedTicket();
  }

   
  DownloadTicket(pnrNumber:any)
  {
    console.log("PNr Number For download ticket : "+pnrNumber);
    this.flightBookingService.GetBookedTicketDetailsViaPNR(pnrNumber).subscribe({
      next:(res)=>{
 
        console.log(res);
        
        const rows = [];
        for(var i=0;i<res.bookedTicketDetailsResponsesList.length;i++)
        { 
          var temp = [JSON.stringify(res.bookedTicketDetailsResponsesList[i].airlineName),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].name),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].email),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].fromPlace),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].toPlace),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].departureTime),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].arrivalTime),
          JSON.stringify(res.bookedTicketDetailsResponsesList[i].seatNo)];
          rows.push(temp);
        }
        this.print(rows);
        //this.print(JSON.stringify(rows));
      },
      error:(e)=>{
        this.toaster.error("Failed to download ticket.");
       // this.router.navigate(['login']);
      }
    }); 
  }

  public print( data:any) {
    //data=JSON.stringify(data);
    
   // data=data.replaceAll('"', '');
    console.log("DDDD  : "+data);
    const doc = new jsPDF();
    const columns = [["Airline", "Name", "Email","Deparat-Place","To-Place","Depart-Time","Arrival-Time","Seat No."]];
    // const data = [
    //   ["Data 1", "Data 2", "Data 3"],
    //   ["Data 1", "Data 2", "Data 3"]
    // ];

  //   data[0].forEach(element => {      
  //     var temp = [element.id,element.name];
  //     rows.push(temp);

  // }); 
  
    

    autoTable(doc, {
      head: columns,
      body: data,
      didDrawPage: dataArg => {
        doc.setFontSize(20);
        doc.setTextColor(40); 
        //doc.setFillColor()
        doc.text("Flight Ticket", dataArg.settings.margin.left, 10);
      }
    });

    doc.save("table.pdf");
  }

}
