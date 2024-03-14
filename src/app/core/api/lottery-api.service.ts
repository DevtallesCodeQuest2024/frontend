import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { ILottery } from '../models/loterry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LotteryApiService {
  private http = inject(HttpClient);
  private url = environment.url;

  getAllLotterys(): Observable<ILottery[]> {
    return this.http.get<ILottery[]>(`${this.url}/obtenerTodosLosSorteos`);
  }

  getPublicLotterys(): Observable<ILottery[]> {
    return this.http.get<ILottery[]>(
      `${this.url}/obtenerTodosLosSorteosPublicos`
    );
  }

  createLottery(lottery: ILottery): Observable<ILottery> {
    return this.http.post<ILottery>(`${this.url}/createSorteo`, lottery);
  }

  updateLottery(lottery: ILottery): Observable<ILottery> {
    return this.http.put<ILottery>(`${this.url}/actualizarSorteo`, lottery);
  }

  deleteLottery(id: number): Observable<ILottery> {
    return this.http.delete<ILottery>(`${this.url}/eliminarSorteo/${id}`);
  }
}
