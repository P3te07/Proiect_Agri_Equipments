import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { UploadService } from '../../../services/upload-service';
import { AuthService } from '../../../services/auth.service';
import { Equipment } from '../../../models/equipment.model';
import { HttpErrorResponse } from '@angular/common/http';

interface UploadResponse {
  message: string;
  imageUrl: string;
  filename: string;
}

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  newEquipment: Omit<Equipment, 'id'> = {
    name: '',
    description: '',
    pricePerDay: 0,
    available: true,
    imageUrl: ''
  };
  isSubmitting: boolean = false;
  isUploading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private equipmentService: EquipmentService,
    private uploadService: UploadService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('=== ADD EQUIPMENT COMPONENT INIT ===');
    this.authService.reloadUserFromStorage();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Verifică tipul fișierului
      if (!file.type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
        this.errorMessage = 'Te rugăm să selectezi o imagine validă (JPG, PNG, GIF, WEBP)';
        return;
      }
      
      // Verifică dimensiunea (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Imaginea este prea mare. Dimensiunea maximă: 5MB';
        return;
      }
      
      this.selectedFile = file;
      this.errorMessage = '';
      
      // Preview imagine
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imagePreview = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
      
      console.log('📁 File selected:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
    }
  }

  uploadImage(): void {
    console.log('☁️ Upload button clicked');
    
    if (!this.selectedFile) {
      this.errorMessage = 'Te rugăm să selectezi o imagine';
      return;
    }

    this.isUploading = true;
    this.errorMessage = '';

    this.uploadService.uploadImage(this.selectedFile).subscribe({
      next: (response: UploadResponse) => {
        console.log('✅ Image uploaded:', response);
        this.newEquipment.imageUrl = `http://localhost:3000${response.imageUrl}`;
        this.isUploading = false;
        this.successMessage = 'Imagine încărcată cu succes!';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Upload error:', error);
        this.errorMessage = error.error?.message || 'Eroare la încărcarea imaginii';
        this.isUploading = false;
      }
    });
  }

  removeImage(): void {
    console.log('🗑️ Remove image clicked');
    this.selectedFile = null;
    this.imagePreview = null;
    this.newEquipment.imageUrl = '';
  }

  onSubmit(): void {
    console.log('=== 🚀 FORM SUBMIT CALLED ===');
    console.log('Equipment data:', this.newEquipment);
    
    // Verifică dacă există imagine selectată dar neîncărcată
    if (this.selectedFile && !this.newEquipment.imageUrl) {
      console.log('❌ Image selected but not uploaded');
      this.errorMessage = 'Te rugăm să încarci imaginea înainte de a adăuga echipamentul';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('📤 Sending equipment to backend...');

    this.equipmentService.addEquipment(this.newEquipment).subscribe({
      next: (response: Equipment) => {
        console.log('✅ Equipment added successfully:', response);
        this.successMessage = `Echipament adăugat cu succes: ${response.name}`;
        
        setTimeout(() => {
          this.router.navigate(['/equipments']);
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error adding equipment:', error);
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        
        if (error.status === 401) {
          this.errorMessage = 'Sesiunea ta a expirat. Redirecționare către login...';
          this.authService.logout();
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = error.error?.message || 'Eroare la adăugarea echipamentului';
        }
        this.isSubmitting = false;
      }
    });
  }
}