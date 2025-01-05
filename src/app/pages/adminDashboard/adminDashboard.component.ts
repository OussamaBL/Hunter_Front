import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule],
  templateUrl: './adminDashboard.component.html',
  styleUrl: './adminDashboard.component.css'

})
export class AdminDashboardComponent {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }


  logOut() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
