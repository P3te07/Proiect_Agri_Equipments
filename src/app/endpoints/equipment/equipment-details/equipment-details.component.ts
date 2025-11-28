import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { AuthService } from '../../../services/auth.service';
import { Equipment } from '../../../models/equipment.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-equipment-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmModalComponent],
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  equipment: Equipment | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isAdmin: boolean = false;
  isDeleting: boolean = false;
  showDeleteModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.equipmentService.getById(id).subscribe({
        next: (data) => {
          this.equipment = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading equipment:', error);
          this.errorMessage = 'Echipamentul nu a fost găsit';
          this.isLoading = false;
        }
      });
    }
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.equipment || !this.equipment.id) return;

    this.isDeleting = true;
    this.showDeleteModal = false;

    this.equipmentService.deleteEquipment(this.equipment.id).subscribe({
      next: () => {
        console.log('✅ Equipment deleted successfully');
        this.router.navigate(['/equipments']);
      },
      error: (error) => {
        console.error('❌ Delete error:', error);
        
        if (error.status === 401 || error.status === 403) {
          alert('Nu ai permisiunea să ștergi acest echipament!');
          this.router.navigate(['/login']);
        } else {
          alert('Eroare la ștergerea echipamentului');
        }
        
        this.isDeleting = false;
      }
    });
  }
}