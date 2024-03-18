import { Injectable, inject, signal } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

// services
import { MessageService } from 'primeng/api';
import { AuthApiService } from '@app/core/api/auth-api.service';

// interfaces
import { ILogin } from '@app/core/models/auth';
import { IUser } from '@app/core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // services
  private messageService = inject(MessageService);
  private router = inject(Router);
  private authApi = inject(AuthApiService);

  // User Authenticated
  public authUser = signal<IUser | undefined>(undefined);

  isAuthenticated(roleName: string): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';
    if (!token) return of(false);
    if (this.authUser()) return of(true);

    return this.loginRenew().pipe(
      switchMap((user) =>
        user.role === roleName ? of(true) : throwError(() => false)
      ),
      catchError((error) => {
        this.logout();
        return of(false);
      })
    );
  }

  private loginRenew(): Observable<IUser> {
    return this.authApi.renew().pipe(
      map(({ data, token }) => {
        this.authUser.set(data);
        localStorage.setItem('token', token!);
        return data;
      })
    );
  }

  login(data: ILogin): Observable<void> {
    return this.authApi.login(data).pipe(
      tap(({ data, token }) => {
        this.authUser.set(data);
        localStorage.setItem('token', token!);
        this.router.navigateByUrl('/admin');
      }),
      tap(({ data }) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'BIENVENIDO',
          detail: `${data?.firstName} ${data?.lastName}`,
        });
      }),
      switchMap(() => EMPTY)
    );
  }

  logout() {
    this.authUser.set(undefined);
    localStorage.removeItem('token');

    if (this.authUser()?.role === 'admin') {
      this.router.navigateByUrl('/admin/login');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  joinWithDiscord(): Observable<void> {
    return this.authApi.joinWithDiscord().pipe(
      tap((discordUrl) => (window.location.href = discordUrl)),
      switchMap(() => EMPTY)
    );
  }
}
