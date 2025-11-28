import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('🎯 LoginComponent initialized');
  }

  onSubmit(): void {
    console.log('=== LOGIN FORM SUBMITTED ===');
    console.log('📧 Email:', this.credentials.email);
    
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('✅✅✅ Login successful!');
        console.log('Response:', response);
        
        // Verificare IMMEDIATLY după login
        setTimeout(() => {
          const token = localStorage.getItem('access_token');
          const user = localStorage.getItem('current_user');
          
          console.log('🔍 POST-LOGIN CHECK:');
          console.log('Token exists:', !!token);
          console.log('User exists:', !!user);
          console.log('Token value:', token?.substring(0, 30));
          console.log('User value:', user);
          
          if (user) {
            const parsedUser = JSON.parse(user);
            console.log('Parsed user:', parsedUser);
            console.log('User role:', parsedUser.role);
          }
          
          // Verifică și din AuthService
          console.log('AuthService.getCurrentUser():', this.authService.getCurrentUser());
          console.log('AuthService.isLoggedIn():', this.authService.isLoggedIn());
          console.log('AuthService.isAdmin():', this.authService.isAdmin());
        }, 100);
        
        // Navighează după un delay scurt
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      },
      error: (error) => {
        console.error('❌ Login error:', error);
        this.errorMessage = error.error?.message || 'Email sau parolă incorectă';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}