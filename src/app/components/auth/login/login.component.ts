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
    console.log('🔑 Password:', this.credentials.password ? '***' : 'EMPTY');
    console.log('🔑 Password length:', this.credentials.password?.length || 0);
    
    if (!this.credentials.email || !this.credentials.password) {
      console.error('❌ Email or password is empty!');
      this.errorMessage = 'Te rugăm să completezi email-ul și parola';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';

    console.log('📤 Calling authService.login...');
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('✅✅✅ Login successful!');
        console.log('Response:', response);
        console.log('User:', response.user);
        console.log('Role:', response.user.role);
        console.log('Token:', response.access_token);
        
        alert('Login cu succes! Role: ' + response.user.role);
        
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('❌❌❌ Login error!');
        console.error('Full error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        this.errorMessage = error.error?.message || 'Email sau parolă incorectă';
        this.isLoading = false;
        
        alert('Eroare la login: ' + this.errorMessage);
      },
      complete: () => {
        console.log('🏁 Login observable completed');
        this.isLoading = false;
      }
    });
    
    console.log('=== LOGIN FUNCTION ENDED ===');
  }
}