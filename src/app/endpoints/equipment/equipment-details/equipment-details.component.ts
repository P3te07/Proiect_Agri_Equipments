import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { Equipment } from '../../../models/equipment.model';

@Component({
  selector: 'app-equipment-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  equipment: Equipment | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // id este string acum
    
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
}