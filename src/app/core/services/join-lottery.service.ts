import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { EMPTY, Observable, map, of, switchMap, tap } from 'rxjs';
import { IResponse } from '../models/apiResponse';
import { MessageService } from 'primeng/api';
import { ILottery } from '../models/loterry';

@Injectable({
  providedIn: 'root',
})
export class JoinLotteryService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private url = environment.url;

  joinLottery(lotteryId: number): Observable<ILottery> {
    return this.http
      .post<IResponse<ILottery>>(`${this.url}/lotterys/join`, {
        lotteryId,
      })
      .pipe(
        tap((resp) => this.showMessage(resp.message)),
        map((resp) => resp.data)
      );
  }

  private showMessage(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Listo!',
      detail: message,
    });
  }
}
