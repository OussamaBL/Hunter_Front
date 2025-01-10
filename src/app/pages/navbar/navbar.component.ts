import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone:true,
})
export class NavbarComponent  implements OnInit {

  constructor(private router: Router) {}

  isUserMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedData = this.decodeToken(token);
      console.log('Decoded Data:', decodedData);
      console.log(decodedData.role);
      console.log(decodedData.sub);

    } else {
      console.log('No token found');
    }
  }


  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }



}
