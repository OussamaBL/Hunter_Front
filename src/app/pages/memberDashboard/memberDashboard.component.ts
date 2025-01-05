import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-dashboard',
  imports: [RouterModule],
  templateUrl: './memberDashboard.component.html',
  styleUrl: './memberDashboard.component.css'

})
export class MemberDashboardComponent {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }


  logOut() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
