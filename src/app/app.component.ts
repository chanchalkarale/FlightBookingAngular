import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlightBooking';
  sideBarOpen = true;
    isAuthenticated:boolean=true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
 }
