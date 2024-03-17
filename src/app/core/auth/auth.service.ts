import { Injectable, inject, signal } from '@angular/core';
import {EMPTY, Observable, catchError, map, of, switchMap, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';

// services
import { MessageService } from 'primeng/api';
import { AuthApiService } from '@app/core/api/auth-api.service';

// interfaces
import { ILogin } from '@app/core/models/auth';
import { IUser } from '@app/core/models/user';
import { IResponse } from "../models/apiResponse";
import {getFirstMessageOfError} from "@app/shared/utils/message-values";

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

  isAuthenticated(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';

    if (!token) return of(false);

    if (this.authUser()) return of(true);

    return this.loginRenew().pipe(
      map(() => true),
      catchError((err) => {
        this.logout();
        return of(false);
      })
    );
  }

  private loginRenew(): Observable<IResponse<IUser>> {
    return this.authApi.renew().pipe(
      tap(({data, token}) => {
        this.authUser.set(data);
        localStorage.setItem('token', token!);
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
    this.router.navigateByUrl('/admin/login');
  }

  joinWithDiscord(): Observable<any> {
    return this.authApi.joinWithDiscord().pipe(
      tap((response) => {
        return response;
      }),
      catchError(({ error }) => {
        return throwError( () => 'Error al iniciar sesión con Discord');
      })
    )
  }

}
