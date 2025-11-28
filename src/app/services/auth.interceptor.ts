import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  
  if (!isBrowser) {
    console.log('❌ Not in browser, skipping auth interceptor');
    return next(req);
  }

  const token = localStorage.getItem('access_token');
  
  console.log('🔍 Auth Interceptor called');
  console.log('📍 Request URL:', req.url);
  console.log('🎫 Token exists:', !!token);
  
  if (token) {
    console.log('🎫 Token (first 20 chars):', token.substring(0, 20));
    
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Authorization header added');
    return next(cloned);
  }
  
  console.log('⚠️ No token found, sending request without auth');
  return next(req);
};