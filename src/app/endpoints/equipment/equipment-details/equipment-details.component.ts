import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  equipment: Equipment | undefined;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.equipment = this.equipmentService.getById(id);
    }
  }
}
