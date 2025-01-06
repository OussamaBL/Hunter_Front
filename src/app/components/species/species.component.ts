import { ApiService } from '../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface Species {
  id: string;
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;

}

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports : [RouterModule]
})
export class SpeciesComponent implements OnInit {


  isLoading = false;

  species: Species[] = [];

  constructor(private api: ApiService) {}
  getspecies(): Observable<Species[]> {
    this.isLoading = true;
    return this.api.get<Species[]>('/species');
  }

  ngOnInit() {
    this.getspecies().subscribe(species => {
      this.species = species;
      console.log(species);
      setTimeout(() => {
        if (species.length >0) {
          this.isLoading = false;
        }
      }, 500);

    });


  }


  delete(speciesId: string) {
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
        this.api.delete<any>(`/species/${speciesId}`).subscribe({
          next: () => {
            this.species = this.species.filter(species => species.id !== speciesId);
            Swal.fire({
              title: "Deleted!",
              text: "Species has been deleted successfully.",
              icon: "success"
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete species. Please try again.",
              icon: "error"
            });
            console.error('Error deleting species:', error);
          }
        });
      }
    });
  }
}
