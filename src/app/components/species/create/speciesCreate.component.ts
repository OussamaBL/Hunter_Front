import { ApiService } from '../../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf} from "@angular/common";

export interface Species {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  role: string;

}

@Component({
  selector: 'app-species-create',
  templateUrl: './speciesCreate.component.html',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpeciesCreateComponent {

  speciesForm: FormGroup;
  isLoading = false;

  species: Species[] = [];

  constructor( private fb: FormBuilder, private api: ApiService ,  private router: Router) {

    this.speciesForm = this.fb.group({
      name: ['',[ Validators.required ]],
      category: ['', [Validators.required ]],
      minimumWeight: ['', [Validators.required  , Validators.min(0)]],
      difficulty: ['', [Validators.required ]],
      points: ['', [Validators.required , Validators.min(0)]],
    });

  }

  get name() { return this.speciesForm.get('name'); }
  get category() { return this.speciesForm.get('category'); }
  get minimumWeight() { return this.speciesForm.get('minimumWeight'); }
  get difficulty() { return this.speciesForm.get('difficulty'); }
  get points() { return this.speciesForm.get('points'); }




  onSubmit() {
    if (this.speciesForm.valid) {
      const speciesData = this.speciesForm.value;
      this.api.post<Species>('/species', speciesData).subscribe({
        next: (newCompetition) => {
          console.log('species created:', newCompetition);
          this.species.push(newCompetition);
          this.speciesForm.reset();
          Swal.fire({
            title: "Good job!",
            text: "species created successfully",
            icon: "success"
          });
        },
        error: (err) => { ;
          console.error('Error creating species:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
