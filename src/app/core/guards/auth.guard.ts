import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated('admin').pipe(
    map((isAuth) => {
      if (isAuth){
        const role = authService.authUser()?.role
        if (role === 'admin') return true;
      }
      router.navigateByUrl('/admin/login');
      return false;
    })
  );
};

export const authDiscordGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated('guest').pipe(map((_) => true));
};
