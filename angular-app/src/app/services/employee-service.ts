import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employeeModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/emp';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.BASE_URL);
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
