import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { JuryDashboardComponent } from '../juryDashboard/juryDashboard.component';

@Component({
  selector: 'app-jury-layout',
  imports: [JuryDashboardComponent ,NavbarComponent , RouterOutlet],
  templateUrl: './juryLayout.component.html',
  styleUrl: './juryLayout.component.css'
})
export class JuryLayoutComponent {

}
