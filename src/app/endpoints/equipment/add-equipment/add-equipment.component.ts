import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  constructor(private equipmentService: EquipmentService) {}

  onSubmit() {
    this.equipmentService.addEquipment(this.newEquipment);
    alert(`Echipament adăugat: ${this.newEquipment.name}`);
    this.newEquipment = {
      name: '',
      description: '',
      pricePerDay: 0,
      available: true,
      imageUrl: ''
    };
  }
}
