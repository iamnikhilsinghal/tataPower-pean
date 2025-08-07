import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employeeModel';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  BASE_URL = 'http://localhost:8080/api/emp';

  getEmployees(): Observable<Employee[]> {
    const token = this.authService.fetchToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.get<Employee[]>(this.BASE_URL, headers);
  }

  // no id pass
  addEmployee(emp: any) {
    return this.http.post(this.BASE_URL, emp);
  }

  // id pass
  editEmployee(id: number, emp: any) {
    return this.http.put(`${this.BASE_URL}/${id}`, emp);
  }

  getEmployeesById(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}

// KISI ne code likha service ka to bhejo
