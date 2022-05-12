import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AirlineService } from 'src/app/_services/airline.service';
import { AirlineDialogComponent } from '../airline-dialog/airline-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogServiceService } from 'src/app/_services/dialog-service.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {
  airlines:any[];
  detailsTab:number;
  displayedColumns: string[] = ['airlineName', 'status','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService:AirlineService,
               public dialog: MatDialog, 
               private toaster:ToastrService,
               private router: Router,
               private dialogConfirm: DialogServiceService) { }
  


  ngOnInit(): void {

    this.GetAllAirline();
  }

  openDialog() {
    this.dialog.open(AirlineDialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.GetAllAirline();
      }
    });
  }

  GetAllAirline()
  { 
    this.airlineService.GetAllAirlinesList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
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

  DeleteAirline(airlineId:any)
  {
     console.log("Delete : "+airlineId);

     this.dialogConfirm
    .confirmDialog({
      title: 'Are you sure?',
      message: 'Are you sure you want to delete airline?',
      confirmCaption: 'Yes',
      cancelCaption: 'No',
    })
    .subscribe((yes) => {
      if (yes)
      { 
        this.airlineService.RemoveAirline(airlineId).subscribe({
          next:(res)=>{
             if(res)
             {
              this.toaster.success("Successfully deleted airline.");  
             }
             else
             {
              this.toaster.success("Failed to delete.");
             }
             this.GetAllAirline();
          },
          error:(err)=>
          {
            this.toaster.error("Failed to delete.");
          }
        });
        console.log('The user said YES');
      } 
    });

    
  }

  BlockUnblockAirline(airlineId:number,status:number)
  {
     console.log("airlineId : "+airlineId);
     console.log("delete status : "+status);
     var msg="";
     if(status==1)
     {
       msg="Are you sure you want to blocked airline?";
     }
     else
     {
       msg="Are you sure you want to Un-blocked airline?";
     }
     this.dialogConfirm
     .confirmDialog({
       title: 'Are you sure?',
       message: msg,//'Are you sure you want to do this?',
       confirmCaption: 'Yes',
       cancelCaption: 'No',
     })
     .subscribe((yes) => {
       if (yes)
       { 
        this.airlineService.BlockUnblockAirline(airlineId,status).subscribe({
          next:(res)=>{
             if(status==1)
             {
              this.toaster.success("Successfully blocked airline.");  
             }
             else
             {
              this.toaster.success("Successfully un-blocked airline.");
             }
             this.GetAllAirline();
          },
          error:(err)=>
          {
            this.toaster.error("Failed to get action.");
          }
        });
         console.log('The user said YES');
       } 
     });
     
  }

  


}
