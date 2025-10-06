import { Injectable } from '@angular/core';
import { Equipment } from './equipment-details.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentDetailsService {
  private equipmentList: Equipment[] = [
    {
      id: 1,
      name: 'Excavator',
      description: 'Excavator de 20 tone',
      pricePerDay: 150,
      available: true,
      imageUrl: 'excavator.jpg'
    },
  ];

  getEquipmentById(id: number): Equipment | undefined {
    return this.equipmentList.find(equip => equip.id === id);
  }
}
