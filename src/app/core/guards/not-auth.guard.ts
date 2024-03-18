import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated('admin').pipe(
    map((isAuth) => {
      if (!isAuth) return true;

      router.navigateByUrl('/admin');
      return false;
    })
  );
};
