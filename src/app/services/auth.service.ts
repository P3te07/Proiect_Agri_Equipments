import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { User, LoginRequest, AuthResponse, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(private http: HttpClient) {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    
    if (this.isBrowser) {
      this.loadUserFromStorage();
    }
    
    console.log('🔧 AuthService initialized');
    console.log('🌐 API URL:', this.apiUrl);
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser) return;

    try {
      const token = localStorage.getItem('access_token');
      const userStr = localStorage.getItem('current_user');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        console.log('👤 User loaded from storage:', user);
      }
    } catch (e) {
      console.error('Error loading user from storage:', e);
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    console.log('🚀 AuthService.login called');
    console.log('📧 Email:', credentials.email);
    console.log('🔑 Password length:', credentials.password?.length);
    console.log('🌐 Sending POST to:', `${this.apiUrl}/login`);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('✅ Response received:', response);
        if (this.isBrowser) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('current_user', JSON.stringify(response.user));
          console.log('💾 Data saved to localStorage');
        }
        this.currentUserSubject.next(response.user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('❌ HTTP Error:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error body:', error.error);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    console.log('🚀 AuthService.register called');
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        console.log('✅ Register response received:', response);
        if (this.isBrowser) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('current_user', JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Register error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    console.log('🚪 Logout called');
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}