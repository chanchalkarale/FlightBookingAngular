import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AirlineService } from 'src/app/_services/airline.service';
import { DialogServiceService } from 'src/app/_services/dialog-service.service';
import { DiscountDialogComponent } from './discount-dialog/discount-dialog.component';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  
  detailsTab:number;
  displayedColumns: string[] = ['discountCode', 'cost','expiryDate','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService:AirlineService,
             public dialog: MatDialog, 
             private toaster:ToastrService,
             private router: Router,
             private dialogConfirm: DialogServiceService) { }

  ngOnInit(): void {
    this.GetAllDiscounts();
  }

  openDiscountDialog() {
    this.dialog.open(DiscountDialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.GetAllDiscounts();
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

  GetAllDiscounts()
  {
    console.log("GetAllDiscounts");
    
    this.airlineService.GetAllDiscountDetails().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.discountsResponsesLists);
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

 ConfirmDialog(msg:any)
 {
    var result=false;
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
        
        console.log('The user said YES');
      } 
    });
    return result;
 }

  DeleteDiscount(discountId:any)
  { 
    console.log("Delete Id : "+discountId);
    this.dialogConfirm
    .confirmDialog({
      title: 'Are you sure?',
      message: 'Are you sure you want to delete discount?',
      confirmCaption: 'Yes',
      cancelCaption: 'No',
    })
    .subscribe((yes) => {
      if (yes)
      { 
        
        console.log('The user said YES');
        this.airlineService.RemoveDiscount(discountId).subscribe({
          next:(res)=>{
             if(res)
             {
              this.toaster.success("Successfully deleted.");  
             }
             else
             {
              this.toaster.success("Failed to delete.");
             }
             this.GetAllDiscounts();
          },
          error:(err)=>
          {
            this.toaster.error("Failed to delete.");
          }
        });
      } 
    });

   
    
  }

  EditDiscount(row:any)
  {
    this.dialog.open(DiscountDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.GetAllDiscounts();
      }
    });
  }

}
