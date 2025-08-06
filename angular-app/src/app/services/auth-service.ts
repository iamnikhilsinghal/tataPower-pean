import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/auth';

  signup(emp: any) {
    return this.http.post(`${this.BASE_URL}/signup`, emp);
  }

  login(emp: any) {
    return this.http.post(`${this.BASE_URL}/login`, emp);
  }
}
