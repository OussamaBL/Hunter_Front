import { ApiService } from '../../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf} from "@angular/common";

export interface Competition {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  role: string;

}

@Component({
  selector: 'app-competition-create',
  templateUrl: './competitionCreate.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompetitionCreateComponent  {

  competitionForm: FormGroup;
  isLoading = false;

  competitions: Competition[] = [];

  constructor( private fb: FormBuilder, private api: ApiService ,  private router: Router) {

    this.competitionForm = this.fb.group({
      speciesType: ['',[ Validators.required ]],
      date: ['', [Validators.required ]],
      code: ['', [Validators.required , Validators.minLength(3)]],
      openRegistration: ['', [Validators.required]],
      location: ['',[ Validators.required , Validators.minLength(5)]],
      minParticipants: ['', [Validators.required , Validators.min(1)]],
      maxParticipants: ['', [Validators.required]],

    });
  }

  get speciesType() { return this.competitionForm.get('speciesType'); }
  get date() { return this.competitionForm.get('date'); }
  get code() { return this.competitionForm.get('code'); }
  get openRegistration() { return this.competitionForm.get('openRegistration'); }
  get location() { return this.competitionForm.get('location'); }
  get minParticipants() { return this.competitionForm.get('minParticipants'); }
  get maxParticipants() { return this.competitionForm.get('maxParticipants'); }




  onSubmit() {
    if (this.competitionForm.valid) {
      const competitionData = this.competitionForm.value;
      this.api.post<Competition>('/competitions', competitionData).subscribe({
        next: (newCompetition) => {
          console.log('competition created:', newCompetition);
          this.competitions.push(newCompetition);
          this.competitionForm.reset();
          Swal.fire({
            title: "Good job!",
            text: "competition created successfully",
            icon: "success"
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'error : '+err,
            confirmButtonText: 'Try Again',
          });
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
