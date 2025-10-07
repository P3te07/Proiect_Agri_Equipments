import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-equipments',
  standalone: true, 
  imports: [FormsModule],               
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent { 
  newEquipment = {
    name: '',
    description: '',
    pricePerDay: 0,
    imageUrl: '',
    available: false
  };

  onSubmit() {
    console.log('Echipament adăugat:', this.newEquipment);
  }

}
