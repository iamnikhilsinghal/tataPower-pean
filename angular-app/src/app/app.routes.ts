import { Routes } from '@angular/router';
import { Employees } from './components/employees/employees';
import { CreateEmployee } from './components/create-employee/create-employee';

export const routes: Routes = [
  { path: 'employees', component: Employees },
  { path: 'create-employee', component: CreateEmployee },
];
