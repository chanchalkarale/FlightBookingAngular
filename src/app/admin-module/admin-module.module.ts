import { NgModule } from '@angular/core'; 
import { AdminRoutingModule } from './admin-routing.module';
// import { HeaderComponent } from '../header/header.component';
// import { SidenavComponent } from '../sidenav/sidenav.component';
// import { HomeComponent } from '../home/home.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { ReactiveFormsModule }    from '@angular/forms';
// import {DemoComponent} from '../demo/demo.component';
 

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
//import { LoginComponent } from './login/login.component';
import{FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ 
    // HeaderComponent,
    // SidenavComponent,
    // HomeComponent,
    // DashboardComponent,
    // DemoComponent
  ],
  imports: [ 
    AdminRoutingModule,
    
    // BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //ReactiveFormsModule,
    //BrowserAnimationsModule,
    //Materil imports
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ],
})
export class AdminModuleModule { }
