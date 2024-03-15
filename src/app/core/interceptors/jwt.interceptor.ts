import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');

  if (token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);

    req = req.clone({ headers });
  }

  return next(req);
};
