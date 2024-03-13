import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '@app/core/models/user';
import { ILogin } from '@app/core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  login(data: ILogin): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/login`, data);
  }

  renew(): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/renew`);
  }
}
