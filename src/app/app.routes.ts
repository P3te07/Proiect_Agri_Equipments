import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./endpoints/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'equipments', 
    loadComponent: () => import('./endpoints/equipment/equipment-list/equipment-list.component').then(m => m.EquipmentListComponent)
  },
  { 
    path: 'equipments/:id', 
    loadComponent: () => import('./endpoints/equipment/equipment-details/equipment-details.component').then(m => m.EquipmentDetailsComponent)
  },
  { 
    path: 'add-equipment', 
    loadComponent: () => import('./endpoints/equipment/add-equipment/add-equipment.component').then(m => m.AddEquipmentComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./endpoints/contact/contact.component').then(m => m.ContactComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./endpoints/about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: '**', 
    redirectTo: ''
  }
];