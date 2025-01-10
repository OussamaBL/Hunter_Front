import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule],
  standalone:true,
  templateUrl: './adminDashboard.component.html',
  styleUrl: './adminDashboard.component.css'

})
export class AdminDashboardComponent {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }


  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
