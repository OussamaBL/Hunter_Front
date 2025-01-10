import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

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
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class CompetitionComponent implements OnInit {
  isLoading = false;
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

        console.log(response.content);
        if(response.content){
          Swal.fire({
            icon: 'error',
            title: 'No data',
            text: 'Competition not found',
            confirmButtonText: 'Try Again',
          });
        }
        setTimeout(() => {
          if (response.content.length > 0) {
            this.isLoading = false;
          }
        }, 500);
      },
      error: (error) => {
        console.error('Error fetching competitions:', error);
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
}
