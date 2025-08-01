import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
// import { Employee } from '../../models/employeeModel';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees implements OnInit {
  employeeList: any = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log('data', data);
      this.employeeList = data;
    });
  }

  onDeleteClick(id: number) {
    console.log('id is', id);
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      console.log('data', data);
      this.getEmployeeList();
    });
  }
}

// Create employee service and call here
// get api- http://localhost:8080
