import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private equipments: Equipment[] = [
    { id: 1, name: 'Tractor', description: 'John Deere 9RX 640 : 691CP, Capacitate motor: 13.6l, 25.5 tone ', pricePerDay: 200, available: true, imageUrl: 'C:\Users\Admin\Desktop\Proiect_Prog_Avansata\src\assets\images\johndeere9rx.jfif' },
    { id: 2, name: 'Tractor', description: 'CaseIH Optum CVX 300 : 267CP, Capacitate motor: 6.7l, 11.1 tone ', pricePerDay: 40, available: true, imageUrl: 'C:\Users\Admin\Desktop\Proiect_Prog_Avansata\src\assets\images\case300cvx.jpg'},

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