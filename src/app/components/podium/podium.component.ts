import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-podium',
  imports: [],
  standalone:true,
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css'
})
export class PodiumComponent implements OnInit {

  id:string = '';
  podium:any ;

  constructor(private route: ActivatedRoute , private api :ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = params['id'];
      console.log(this.id);
    });

    this.getPodium();

  }

  getPodium() {
    this.api.get<any>(`/participations/podium/${this.id}`).subscribe({
      next: (response) => {
        this.podium = response;
        console.log('Podium:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
