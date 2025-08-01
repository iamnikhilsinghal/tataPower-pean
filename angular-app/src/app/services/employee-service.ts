import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get('http://localhost:8080');
  }

  // no id pass
  addEmployee(emp: any) {
    return this.http.post(`http://localhost:8080`, emp);
  }

  // id pass
  editEmployee(id: number, emp: any) {
    return this.http.put(`http://localhost:8080/${id}`, emp);
  }

  getEmployeesById(id: number) {
    return this.http.get(`http://localhost:8080/${id}`);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`http://localhost:8080/${id}`);
  }
}

// KISI ne code likha service ka to bhejo
