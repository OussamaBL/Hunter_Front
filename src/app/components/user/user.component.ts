import { ApiService } from './../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
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
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  styleUrls: ['./user.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports : [RouterModule]
})
export class UserComponent implements OnInit {


  isLoading = false;

  users: User[] = [];

  constructor(private api: ApiService) {}
  getUsers(): Observable<User[]> {
    this.isLoading = true;
    return this.api.get<User[]>('/users');
  }

  ngOnInit() {
    this.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      setTimeout(() => {
        if (users.length >0) {
          this.isLoading = false;
        }
      }, 500);

    });


  }


  delete(userId: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete<any>(`/users/${userId}`).subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== userId);
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success"
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete user."+error,
              icon: "error"
            });
            console.error('Error deleting user:', error);
          }
        });
      }
    });
  }
}
