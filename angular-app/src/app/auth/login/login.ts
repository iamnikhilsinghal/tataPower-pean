import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const logindetails = this.loginForm.value;
      console.log('logindetails', logindetails);

      this.authservice.login(logindetails).subscribe((data: any) => {
        console.log('data', data);
        if (data?.token) {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        } else {
          alert('Token not found in response');
        }
      });
    }
  }
}
