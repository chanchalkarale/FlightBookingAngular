import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['home/flight']);
  }

  get isAdmin() {
    //console.log('isAdmin : '+localStorage.getItem('roles'));
    return localStorage.getItem('roles') && localStorage.getItem('roles') === 'admin';
}

}
