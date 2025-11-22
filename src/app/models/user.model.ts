export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;      // Adaugă acesta
  address?: string;    // Adaugă acesta
}

export interface AuthResponse {
  user: User;
  access_token: string;
}