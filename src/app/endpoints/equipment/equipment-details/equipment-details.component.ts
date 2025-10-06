import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipmentDetailsService } from './equipment-details.service';
import { Equipment } from './equipment-details.model';

@Component({
  selector: 'app-equipment-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  equipment: Equipment | undefined;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentDetailsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam; 
      this.equipment = this.equipmentService.getEquipmentById(id);
    }
  }
}
