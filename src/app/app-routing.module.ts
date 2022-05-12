import { NgModule } from '@angular/core';
 

import { RouterModule, Routes } from '@angular/router';
import { AirlineDetailsComponent } from './admin/airline-details/airline-details.component';
import { DiscountComponent } from './admin/discount/discount.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { FlightbookingComponent } from './booking/flightbooking/flightbooking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoComponent } from './demo/demo.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
  import { HomeComponent } from './home/home.component';
// import{UserFormComponent} from './user-details/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { ManageBookingHistoryComponent } from './manage-booking-history/manage-booking-history.component';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserFormComponent } from './user-details/user-form/user-form.component';
import { UserRegistration } from './User/user-registration.model';


const routes: Routes = [
  //{path:'registration',component:UserFormComponent},
  {path:'',component:LoginComponent,canActivate:[AuthGuard]}, 
   // {path:'home',component:HomeComponent},
   {path:'register',component:UserFormComponent},
   {path:'login',component:LoginComponent},
   {
    path: 'home', component: HomeComponent , 
    children: [
      { path: 'dashboard', component: DashboardComponent},  
      { path: 'demo', component: DemoComponent,canActivate:[RoleGuard]},  
      { path: 'sideNav', component: SidenavComponent,},  
      { path: 'home', component: HomeComponent}, 
      { path: 'schedule', component: ScheduleComponent}, 
      { path: 'airlineDetails', component: AirlineDetailsComponent}, 
      { path: 'discount', component: DiscountComponent},
      { path: 'flight', component: FlightbookingComponent}, 
      { path: 'manage', component: ManagebookingComponent}, 
      { path: 'history', component: ManageBookingHistoryComponent}, 
      //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    ],canActivate:[AuthGuard]
   }
  //  {
  //   path: 'admin',
  //  // canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./admin-module/admin-module.module').then((m) => m.AdminModuleModule),canActivate:[AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
