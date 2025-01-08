import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MemberDashboardComponent } from '../memberDashboard/memberDashboard.component';

@Component({
  selector: 'app-member-layout',
  imports: [MemberDashboardComponent ,NavbarComponent , RouterOutlet],
  standalone: true,
  templateUrl: './memberLayout.component.html',
  styleUrl: './memberLayout.component.css'
})
export class MemberLayoutComponent {

}
