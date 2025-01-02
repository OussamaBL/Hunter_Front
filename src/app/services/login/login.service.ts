import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
// @ts-ignore
import {jwtDecode, JwtPayload} from "jwt-decode";

export interface LoginResponse {
  token: string;
}
export interface CustomJwtPayload extends JwtPayload {
  username?: string;
  role?: string;
}
@Injectable({
  providedIn: 'root',
  deps: [HttpClient]  // Add this line
})
export class LoginService {
  private apiUrl = 'https://localhost:8443/api/users/Login';
  constructor(private http:HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials)
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          alert('Login error:'+ error);
          throw error;
        })
      );
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove the token from localStorage
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("le token not found");
      return null;
    }

    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      console.log(decodedToken.username);
      return decodedToken.username || null; // Retourne le champ "username" ou null
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve the token from localStorage
  }

}
