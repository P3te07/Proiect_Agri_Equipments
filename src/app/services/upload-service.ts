import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UploadResponse {
  message: string;
  imageUrl: string;
  filename: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/equipment/upload';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    console.log('Uploading image:', file.name);
    return this.http.post<UploadResponse>(this.apiUrl, formData);
  }
}