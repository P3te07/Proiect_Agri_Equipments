import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConfirmModalComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing: boolean = false;
  isSaving: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  showLogoutModal: boolean = false;

  editData = {
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  };

  private apiUrl = 'http://localhost:3000/users/profile';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.editData = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      phone: this.user.phone || '',
      address: this.user.address || ''
    };
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.isEditing = false;
      if (this.user) {
        this.editData = {
          firstName: this.user.firstName || '',
          lastName: this.user.lastName || '',
          phone: this.user.phone || '',
          address: this.user.address || ''
        };
      }
    } else {
      this.isEditing = true;
    }
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveChanges(): void {
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.patch<User>(this.apiUrl, this.editData).subscribe({
      next: (updatedUser) => {
        console.log('Profile updated:', updatedUser);
        
        sessionStorage.setItem('current_user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        
        this.isEditing = false;
        this.isSaving = false;
        this.successMessage = 'Profil actualizat cu succes!';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Update error:', error);
        this.errorMessage = 'Eroare la actualizarea profilului';
        this.isSaving = false;
      }
    });
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}