import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-details/user-form/user-form.component';
import{FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule }    from '@angular/forms';
 

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { DemoComponent } from './demo/demo.component';
import { TokenInterceptorService } from './_helpers/token-interceptor.service';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import {ToastrModule} from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AirlineDetailsComponent } from './admin/airline-details/airline-details.component';
import{MatDialogModule} from '@angular/material/dialog';
import { AirlineDialogComponent } from './admin/airline-dialog/airline-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DiscountComponent } from './admin/discount/discount.component';
import { DiscountDialogComponent } from './admin/discount/discount-dialog/discount-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FlightbookingComponent } from './booking/flightbooking/flightbooking.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FlightbookingdialogComponent } from './booking/flightbooking/flightbookingdialog/flightbookingdialog.component';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import { ManageBookingHistoryComponent } from './manage-booking-history/manage-booking-history.component';
import { CommonConfirmDialogComponent } from './common-confirm-dialog/common-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserFormComponent,
     HeaderComponent,
     SidenavComponent,
     HomeComponent,
     DashboardComponent,
    LoginComponent,
    DemoComponent,
    ScheduleComponent,
    AirlineDetailsComponent,
    AirlineDialogComponent,
    DiscountComponent,
    DiscountDialogComponent,
    FlightbookingComponent,
    FlightbookingdialogComponent,
    ManagebookingComponent,
    ManageBookingHistoryComponent,
    CommonConfirmDialogComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //Materil imports
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    ToastrModule.forRoot(), 
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
