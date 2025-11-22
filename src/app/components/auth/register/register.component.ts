import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: RegisterRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  };
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('📤 Register form submitted');
    
    // Validări
    if (this.userData.password !== this.confirmPassword) {
      this.errorMessage = 'Parolele nu se potrivesc';
      return;
    }

    if (this.userData.password.length < 6) {
      this.errorMessage = 'Parola trebuie să aibă minim 6 caractere';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('✅ Registration successful:', response);
        this.successMessage = 'Cont creat cu succes! Vei fi redirecționat...';
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('❌ Registration error:', error);
        this.errorMessage = error.error?.message || 'Eroare la crearea contului. Email-ul poate fi deja folosit.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}