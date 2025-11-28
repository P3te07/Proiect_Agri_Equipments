import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';
  equipmentId: string | null = null;
  equipmentName: string | null = null;
  submitted: boolean = false;
  error: boolean = false;
  isSubmitting: boolean = false;

  private apiUrl = 'http://localhost:3000/contact';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Preia parametrii din URL
    this.route.queryParams.subscribe(params => {
      this.equipmentId = params['equipmentId'] || null;
      this.equipmentName = params['equipmentName'] || null;
      
      if (this.equipmentName) {
        this.message = `Sunt interesat de echipamentul: ${this.equipmentName}`;
      }
      
      console.log('Equipment ID:', this.equipmentId);
      console.log('Equipment Name:', this.equipmentName);
    });
  }

  submit() {
    if (!this.name || !this.email || !this.message) {
      return;
    }

    this.isSubmitting = true;
    this.error = false;

    const contactData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      equipmentId: this.equipmentId,
      equipmentName: this.equipmentName
    };

    console.log('Sending contact data:', contactData);

    this.http.post(this.apiUrl, contactData).subscribe({
      next: (response) => {
        console.log('Contact saved:', response);
        this.submitted = true;
        this.isSubmitting = false;
        this.name = '';
        this.email = '';
        this.phone = '';
        this.message = '';
      },
      error: (error) => {
        console.error('Error saving contact:', error);
        this.error = true;
        this.isSubmitting = false;
      }
    });
  }
}