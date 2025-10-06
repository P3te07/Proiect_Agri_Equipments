import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private equipments: Equipment[] = [
    { id: 1, name: 'Tractor', description: '...', pricePerDay: 200, available: true, imageUrl: '...' },
  ];

  getAll(): Equipment[] {
    return this.equipments;
  }

  getById(id: number): Equipment | undefined {
    return this.equipments.find(e => e.id === id);
  }

  addEquipment(equipment: Omit<Equipment, 'id'>): void {
    const newId = this.equipments.length + 1;
    this.equipments.push({ id: newId, ...equipment });
  }
}