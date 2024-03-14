import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IRegistry } from '@app/core/models/registry';
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

  registry(data: IRegistry): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.url}/users`, data);
  }
}
