import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private authService: AuthService) {}

  onLoginClick() {
    this.authService
      .login({
        email: 'test@test.com',
        password: '1234567',
      })
      .subscribe((data: any) => {
        console.log('data', data);
        localStorage.setItem('token', data.token);
      });
  }
}
