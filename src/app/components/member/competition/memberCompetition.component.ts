import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
//import {LoginResponse} from '../../login/login.service';

export interface Competition {
  id: string;
  date: Date;
  participationCount: number;
  minParticipants: number;
  maxParticipants: number;
  location: string;
}

export interface PageableResponse {
  content: Competition[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


@Component({
  selector: 'app-competition',
  templateUrl: './memberCompetition.component.html',
  styleUrls: ['./memberCompetition.component.css'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class MemberCompetitionComponent implements OnInit {
  isLoading = false;
  error: string = "";
  timeoutId: any;

  competitions: Competition[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;

  constructor(private api: ApiService) {}

  getCompetitions(): Observable<PageableResponse> {
    this.isLoading = true;
    return this.api.get<PageableResponse>('/competitions');
  }

  ngOnInit() {
    this.getCompetitions().subscribe({
      next: (response: PageableResponse) => {
        this.competitions = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;

        setTimeout(() => {
          if (response.content.length > 0) {
            this.isLoading = false;
          }
        }, 500);
      },
      error: (error) => {
        console.error('Error competitions:', error);
        this.isLoading = false;
      }
    });
  }

  delete(competitionId: string) {
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
        this.api.delete<any>(`/competitions/${competitionId}`).subscribe({
          next: () => {
            this.competitions = this.competitions.filter(competition => competition.id !== competitionId);
            Swal.fire({
              title: "Deleted!",
              text: "Competition has been deleted successfully.",
              icon: "success"
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete competition. Please try again.",
              icon: "error"
            });
            console.error('Error deleting competition:', error);
          }
        });
      }
    });
  }

  addParticipation(id: string) {
    const decodedData = this.decodeToken();
    const data = {
      userEmail: decodedData.sub,
      competitionId : id
    }
    this.api.post(`/participations/register`, data).subscribe({
      next: (response : any) => {
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          timer: 2000,
          confirmButtonText: 'OK',
          confirmButtonColor: 'red',

        });
      },
      error: (error) => {
        if (error?.error) {
          this.error = typeof error.error === 'object' ? error.error.error || error.error.message : error.error;
         /* if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }*/

          /*this.timeoutId = setTimeout(() => {
            this.error = "";
          }, 2000);*/
        }
      }


    });
  }

  decodeToken(): any {
    try {
      const token = localStorage.getItem('token');
      // @ts-ignore
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
}
