import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from "@app/core/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated().pipe(
    map((isAuth) => {
      if (isAuth) return true;

      router.navigateByUrl('/admin/login');
      return false;
    })
  );
};
