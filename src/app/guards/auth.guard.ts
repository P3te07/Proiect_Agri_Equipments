import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard checking...');
  console.log('Is logged in:', authService.isLoggedIn());
  
  if (authService.isLoggedIn()) {
    console.log('Auth Guard: User is logged in');
    return true;
  }

  console.log('Auth Guard: User not logged in, redirecting to login');
  router.navigate(['/login']);
  return false;
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    console.log('Admin Guard: User not logged in, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
  
  if (authService.isAdmin()) {
    console.log('Admin Guard: User is admin');
    return true;
  }

  console.log('Admin Guard: User is not admin, redirecting to home');
  alert('Această pagină este disponibilă doar pentru administratori!');
  router.navigate(['/']);
  return false;
};