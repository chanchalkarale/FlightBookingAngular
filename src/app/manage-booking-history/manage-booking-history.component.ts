import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlightbookingService } from '../_services/flightbooking.service';

@Component({
  selector: 'app-manage-booking-history',
  templateUrl: './manage-booking-history.component.html',
  styleUrls: ['./manage-booking-history.component.css']
})
export class ManageBookingHistoryComponent implements OnInit {

  displayedColumns: string[] =['airline', 'fromPlace','toplace','totalseat','cost','details'];
  dataSource: MatTableDataSource<any>;

  FirstTab=1;
  SecondTab=0;

  userDetailsColumns: string[] = ['airlineName', 'name','ufromplace','utoplace','seatno','age','gender','meal','journey'];
  userDetailsdataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   

  constructor(private flightBookingService:FlightbookingService,
    public dialog: MatDialog, 
    private toaster:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetAllBookedTicket();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetAllBookedTicket()
  {
    console.log("GetAllBookedTicket");

    var userIdTemp=localStorage.getItem('sessionUserId');
    var userId=parseInt(userIdTemp==null?"0":userIdTemp);
    console.log("Booked Ticket Parse UserId :"+userId);
    
    this.flightBookingService.GetAllBookedTicketsHistory(userId).subscribe({
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

  TicketHistoryDetails(pnrNumber:any)
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

  applyFilterUserDetails(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDetailsdataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDetailsdataSource.paginator) {
      this.userDetailsdataSource.paginator.firstPage();
    }
  }

  Back()
  {
    this.FirstTab=1;
    this.SecondTab=0;
    this.GetAllBookedTicket();
  }


}
