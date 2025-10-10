import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  submit() {
    alert(`Mesaj trimis!\nNume: ${this.name}\nEmail: ${this.email}\nMesaj: ${this.message}`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
