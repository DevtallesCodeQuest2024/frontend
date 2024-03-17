import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { IUser } from '@app/core/models/user';
import { ILogin } from '@app/core/models/auth';
import { IResponse } from "../models/apiResponse";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private url = environment.url;
  private DISCORD_CLIENT_ID = environment.DISCORD_CLIENT_ID;
  private DISCORD_CALLBACK_URL = environment.DISCORD_CALLBACK_URL;

  login(data: ILogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.url}/users/login`, data);
  }

  renew(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.url}/users/renew`);
  }

  joinWithDiscord(): Observable<any> {
    const discordAuthUrl = `https://discord.com/oauth2/authorize?response_type=code&client_id=${this.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(this.DISCORD_CALLBACK_URL)}&scope=identify%20email`;
    return of(discordAuthUrl);
  }
}
