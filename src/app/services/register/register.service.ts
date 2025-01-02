import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

export interface RegisterResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://localhost:8443/api/users/Register'; // Adjust the endpoint

  constructor(private http: HttpClient) {}

  register(userData: { email: string; password: string; username: string }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, userData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        alert('Registration error: ' + error.message);
        throw error;
      })
    );
  }
}
