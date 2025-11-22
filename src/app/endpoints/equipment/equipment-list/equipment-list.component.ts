import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { Equipment } from '../../../models/equipment.model';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private equipmentService: EquipmentService) {}
  
  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        this.equipments = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading equipments:', error);
        this.errorMessage = 'Eroare la încărcarea echipamentelor';
        this.isLoading = false;
      }
    });
  }
}