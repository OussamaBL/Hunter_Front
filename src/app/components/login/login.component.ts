import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from "../../services/login/login.service";
import {Router, RouterLink} from '@angular/router';
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,

  ],
  providers: [LoginService]  // Add this line

  // Optional for extra styles
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

    console.log('Form Submitted', this.loginForm.value);

    const credentials = this.loginForm.value;
    this.loginService.login(credentials).subscribe({
      next: (response) => {
        if (response && response.token)
          localStorage.setItem('token', response.token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome to the application!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/member']);
          });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error?.message || 'An unexpected error occurred.',
          confirmButtonText: 'Try Again',
        });
      }
    })
  }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  }
}
