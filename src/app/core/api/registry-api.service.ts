import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@app/core/models/apiResponse';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegistryApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  preRegistry(email: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/auth`, { email });
  }

  verifyToken(token: string): Observable<IResponse> {

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    return this.http.get<IResponse>(`${this.url}/auth`, {headers});
  }

  registry(data: {password: string}, token: string): Observable<IResponse<IUser>> {

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    return this.http.post<IResponse<IUser>>(`${this.url}/users`, data, {headers});
  }
}
