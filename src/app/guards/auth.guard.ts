import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🛡️ Auth Guard checking...');
  console.log('🔑 Is logged in:', authService.isLoggedIn());
  
  if (authService.isLoggedIn()) {
    console.log('✅ Auth Guard: User is logged in');
    return true;
  }

  console.log('❌ Auth Guard: User not logged in, redirecting to login');
  router.navigate(['/login']);
  return false;
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('👑 Admin Guard checking...');
  console.log('🔑 Is logged in:', authService.isLoggedIn());
  console.log('👑 Is admin:', authService.isAdmin());
  
  if (authService.isLoggedIn() && authService.isAdmin()) {
    console.log('✅ Admin Guard: User is admin');
    return true;
  }

  console.log('❌ Admin Guard: Access denied, redirecting');
  router.navigate(['/']);
  return false;
};