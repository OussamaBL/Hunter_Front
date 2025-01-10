import { Component } from '@angular/core';
import { AdminDashboardComponent } from '../adminDashboard/adminDashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [ AdminDashboardComponent , NavbarComponent , RouterOutlet],
  templateUrl: './adminLayout.component.html',
  styleUrl: './adminLayout.component.css',
  standalone:true
})
export class AdminLayoutComponent {

}
