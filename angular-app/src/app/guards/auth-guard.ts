import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}

  canActivate(): boolean {
    console.log('canActivate called');
    const token = this.authservice.fetchToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
