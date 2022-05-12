import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
// import { SidenavComponent } from '../sidenav/sidenav.component';
// import{DemoComponent} from '../demo/demo.component';
import { AuthGuard } from '../shared/auth.guard';
 

const routes: Routes = [
  {path:"",component:DashboardComponent,canActivate:[AuthGuard]},
  {
    
    path: '',
    component: HomeComponent,
    // children: [
    //   { path: 'dashboard', component: DashboardComponent },  
    //   { path: 'demo', component: DemoComponent },  
    //   { path: 'sideNav', component: SidenavComponent },  
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // ],canActivate:[AuthGuard]
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
