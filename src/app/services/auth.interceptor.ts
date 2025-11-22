import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if we're in browser environment
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  
  if (!isBrowser) {
    return next(req);
  }

  const token = localStorage.getItem('access_token');
  
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  
  return next(req);
};