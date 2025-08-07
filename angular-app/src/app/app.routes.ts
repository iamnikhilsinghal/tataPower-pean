import { Routes } from '@angular/router';
import { Employees } from './components/employees/employees';
import { CreateEmployee } from './components/create-employee/create-employee';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: '', component: Home },
  { path: 'employees', component: Employees },
  { path: 'add-employee', component: CreateEmployee },
];
