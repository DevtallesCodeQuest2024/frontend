import { Injectable, inject, signal } from '@angular/core';
import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

// interfaces
import { ILogin } from '@app/core/models/auth';
import { IUser } from '@app/core/models/user';
import { AuthApiService } from '@app/core/api/auth-api.service';

const user: IUser = {
  name: 'gregory arcentales',
  email: 'gregoarcenta@gmail.com',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // services
  private router = inject(Router);
  // private authApi = inject(AuthApiService);

  // variables
  authUser = signal<IUser | undefined>(undefined);

  isAuthenticated(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';

    if (!token) return of(false);

    if (this.authUser()) return of(true);

    return this.loginRenew().pipe(
      map(() => true),
      catchError((err) => {
        console.error(err);
        this.logout();
        return of(false);
      })
    );
  }

  private loginRenew(): Observable<IUser> {
    // return this.authApi.renew().pipe()
    return of(user).pipe(
      tap((user) => {
        this.authUser.set(user);
        localStorage.setItem('token', 'abc');
      })
      // switchMap(() => throwError(() => 'EEEEERRROORRRR'))
    );
  }

  login(data: ILogin): Observable<IUser> {
    // return this.authApi.login().pipe()
    return of(user).pipe(
      tap((data) => {
        this.authUser.set(data);
        localStorage.setItem('token', 'abc');
        this.router.navigateByUrl('/admin');
      })
    );
  }

  logout() {
    this.authUser.set(undefined);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/admin/login');
  }
}
