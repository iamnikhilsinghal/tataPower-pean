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
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.signupform = this.fb.group({
      fname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupform.valid) {
      console.log('this.signupform.value', this.signupform.value);
      this.authservice.signup(this.signupform.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
