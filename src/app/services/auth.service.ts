import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, interval } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, AuthResponse, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    
    if (this.isBrowser) {
      this.loadUserFromStorage();
      this.startTokenExpirationCheck();
    }
  }

  private startTokenExpirationCheck(): void {
    interval(5 * 60 * 1000).subscribe(() => {
      if (this.isTokenExpired()) {
        console.log('Token expired, logging out...');
        alert('Sesiunea ta a expirat. Te rugăm să te autentifici din nou.');
        this.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; 
      const currentTime = Date.now();
      
      return currentTime > expirationTime;
    } catch (e) {
      return true;
    }
  }

  public reloadUserFromStorage(): void {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser) return;

    try {
      const token = sessionStorage.getItem('access_token');
      const userStr = sessionStorage.getItem('current_user');
      
      if (token && userStr) {
        if (this.isTokenExpired()) {
          console.log('Token expired on load, clearing storage');
          this.logout();
          return;
        }

        const user: User = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        console.log('User loaded from sessionStorage:', user.email);
      }
    } catch (e) {
      console.error('Error loading user from storage:', e);
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        if (this.isBrowser) {
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('current_user', JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((response: AuthResponse) => {
        if (this.isBrowser) {
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('current_user', JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('current_user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('access_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const hasToken = !!this.getToken();
    const hasUser = !!this.getCurrentUser();
    const tokenValid = !this.isTokenExpired();
    return hasToken && hasUser && tokenValid;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}