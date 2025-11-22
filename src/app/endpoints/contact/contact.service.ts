// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id?: string;
  name: string;
  email: string;
  message?: string;
  phone?: string;
  equipmentId?: string;
  equipmentName?: string;
  status?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  submitContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactsByEquipment(equipmentId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/equipment/${equipmentId}`);
  }
}