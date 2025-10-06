import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EquipmentDetailsComponent } from './pages/equipment-details/equipment-details.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipment/:id', component: EquipmentDetailsComponent },
  { path: 'add-equipment', component: AddEquipmentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
