import {Routes} from '@angular/router'
import { HomeComponent } from './endpoints/home/home.component';
import { AboutComponent } from './endpoints/about/about.component';
import { ContactComponent } from './endpoints/contact/contact.component';
import { EquipmentListComponent } from './endpoints/equipment/equipments-list/equipment-list.component';
import { EquipmentDetailsComponent } from './endpoints/equipment/equipment-details/equipment-details.component';
import { AddEquipmentComponent } from './endpoints/equipment/add-equipment/add-equipment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'equipments', component: EquipmentListComponent },
  { path: 'equipments/:id', component: EquipmentDetailsComponent },
  { path: 'equipments/add', component: AddEquipmentComponent },
  { path: '**', redirectTo: '' }
];
