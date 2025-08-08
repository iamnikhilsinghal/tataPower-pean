import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  BASE_URL = 'http://localhost:8080/api/auth';

  signup(emp: any) {
    return this.http.post(`${this.BASE_URL}/signup`, emp);
  }

  login(emp: any) {
    return this.http.post(`${this.BASE_URL}/login`, emp);
  }

  getRoles() {
    return this.http.get(`${this.BASE_URL}/roles`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  fetchToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('token');
    // return Boolean(localStorage.getItem('token'));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
