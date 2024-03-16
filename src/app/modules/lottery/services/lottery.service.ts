import { Injectable, inject, signal } from '@angular/core';
import { LotteryApiService } from '@app/core/api/lottery-api.service';
import { ILottery } from '@app/core/models/loterry';
import { EMPTY, Observable, delay, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class LotteryService {
  // services
  private lotteryApi = inject(LotteryApiService);

  // variables
  public lotterys = signal<ILottery[]>([]);

  getPublicLotterys(): Observable<void> {
    return this.lotteryApi.getPublicLotterys().pipe(
      tap((response) => this.lotterys.set(response.data)),
      switchMap(() => EMPTY)
    );
  }
}
