import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { Equipment } from '../../../models/equipment.model';

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent {
  newEquipment: Omit<Equipment, 'id'> = {
    name: '',
    description: '',
    pricePerDay: 0,
    available: true,
    imageUrl: ''
  };
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  onSubmit() {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.equipmentService.addEquipment(this.newEquipment).subscribe({
      next: (response) => {
        alert(`Echipament adăugat: ${response.name}`);
        this.router.navigate(['/equipments']);
      },
      error: (error) => {
        console.error('Error adding equipment:', error);
        this.errorMessage = error.error?.message || 'Eroare la adăugarea echipamentului';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}