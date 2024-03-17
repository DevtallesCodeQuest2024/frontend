import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { ILottery } from '../models/loterry';
import { Observable } from 'rxjs';
import { IResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class LotteryApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  getAllLotterys(): Observable<IResponse<ILottery[]>> {
    return this.http.get<IResponse<ILottery[]>>(`${this.url}/lotterys`);
  }

  getPublicLotterys(): Observable<IResponse<ILottery[]>> {
    return this.http.get<IResponse<ILottery[]>>(`${this.url}/lotterys/public`);
  }

  getLotteryById(lotteryId: number): Observable<IResponse<ILottery>> {
    return this.http.get<IResponse<ILottery>>(
      `${this.url}/lotterys/${lotteryId}`
    );
  }

  createLottery(lottery: ILottery): Observable<IResponse<ILottery>> {
    return this.http.post<IResponse<ILottery>>(`${this.url}/lotterys`, lottery);
  }

  updateLottery(lottery: ILottery): Observable<IResponse<ILottery>> {
    return this.http.put<IResponse<ILottery>>(`${this.url}/lotterys`, lottery);
  }

  deleteLottery(id: number): Observable<IResponse<ILottery>> {
    const body = { id };
    return this.http.delete<IResponse<ILottery>>(`${this.url}/lotterys`, {
      body,
    });
  }
}
