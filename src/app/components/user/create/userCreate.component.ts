import { ApiService } from '../../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface User {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  role: string;

}

@Component({
  selector: 'app-user-create',
  templateUrl: './userCreate.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  isLoading = false;

  users: User[] = [];

  constructor( private fb: FormBuilder, private api: ApiService ,  private router: Router) {

    this.userForm = this.fb.group({
      firstName: ['',[ Validators.required , Validators.minLength(3)]],
      lastName: ['', [Validators.required , Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['',[ Validators.required]],
      nationality: ['', [Validators.required , Validators.minLength(5)]],
      cin: ['', [Validators.required , Validators.minLength(5)]],
      licenseExpirationDate: ['', [Validators.required]]
    });

  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get role() { return this.userForm.get('role'); }
  get password() { return this.userForm.get('password'); }
  get nationality() { return this.userForm.get('nationality'); }
  get cin() { return this.userForm.get('cin'); }
  get licenseExpirationDate() { return this.userForm.get('licenseExpirationDate');}



  ngOnInit() {


  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.api.post<User>('/users', userData).subscribe({
        next: (newUser) => {
          console.log('User created:', newUser);
          this.users.push(newUser);
          this.userForm.reset();
          Swal.fire({
            title: "Good job!",
            text: "User created successfully",
            icon: "success"
          });
        },
        error: (err) => console.error('Error creating user:', err),
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
