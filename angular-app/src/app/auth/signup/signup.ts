import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  signupform: FormGroup;
  roleList: any;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.signupform = this.fb.group({
      fname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleid: [''],
    });
  }

  ngOnInit(): void {
    this.authservice.getRoles().subscribe((resp) => {
      this.roleList = resp;
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
