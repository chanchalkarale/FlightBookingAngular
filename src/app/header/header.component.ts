import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,private serviceAuth:AuthService) { }
  userName:any;
  ngOnInit(): void {
    console.log('usersName : '+localStorage.getItem('usersName'));
    this.userName=localStorage.getItem('usersName');
  }

  toggleSidebar() {
    console.log("toggleSidebar");
    this.toggleSidebarForMe.emit();
  }

  LogOut(){
    localStorage.removeItem('token'); 
    localStorage.removeItem('roles'); 
    this.router.navigate(['login']);
  }

}
