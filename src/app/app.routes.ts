import { Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '/register', component: RegisterComponent,canActivate:[authGuard] },

];
