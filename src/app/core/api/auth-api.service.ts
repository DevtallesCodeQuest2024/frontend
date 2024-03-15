import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '@app/core/models/user';
import { ILogin } from '@app/core/models/auth';
import { IResponse } from "../models/apiResponse";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  login(data: ILogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.url}/users/login`, data);
  }

  renew(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.url}/users/renew`);
  }
}
