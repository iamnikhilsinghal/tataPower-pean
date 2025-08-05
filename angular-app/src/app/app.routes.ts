import { Routes } from '@angular/router';
import { Employees } from './components/employees/employees';
import { CreateEmployee } from './components/create-employee/create-employee';
import { Login } from './auth/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'employees', component: Employees },
  { path: 'add-employee', component: CreateEmployee },
];
