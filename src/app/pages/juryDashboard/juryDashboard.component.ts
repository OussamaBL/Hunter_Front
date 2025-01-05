import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-jury-dashboard',
  imports: [RouterModule],
  templateUrl: './juryDashboard.component.html',
  styleUrl: './juryDashboard.component.css'

})
export class JuryDashboardComponent {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }


  logOut() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
