import { Injectable, inject, signal } from '@angular/core';
import { LotteryApiService } from '@app/core/api/lottery-api.service';
import { ILottery } from '@app/core/models/loterry';
import { lotterysMockData } from '@app/core/utils/mockData';
import { MessageService } from "primeng/api";
import { EMPTY, Observable, delay, of, switchMap, take, tap } from 'rxjs';

@Injectable()
export class LotteryService {
  // services
  private messageService = inject(MessageService);
  private lotteryApi = inject(LotteryApiService);

  // variables
  public lotterys = signal<ILottery[]>([]);
  public delayCount = signal<number>(1000);

  getAllLotterys(): Observable<ILottery[]> {
    // return this.lotteryApi.getAllLotterys();

    return of(lotterysMockData).pipe(take(1), delay(this.delayCount()));
  }

  createLottery(lottery: ILottery): Observable<ILottery> {
    // return this.lotteryApi.createLottery(lottery);

    this.lotterys.update((lotterys) => [...lotterys, lottery]);

    return of(lottery).pipe(delay(this.delayCount()));
  }

  updateLottery(lottery: ILottery): Observable<ILottery> {
    // return this.lotteryApi.updateLottery(lottery);

    this.lotterys.update((lotterys) => {
      return lotterys.map((lotteryItem) => {
        if (lotteryItem.id === lottery.id) {
          lotteryItem = lottery;
        }
        return lottery;
      });
    });

    return of(lottery).pipe(delay(this.delayCount()));
  }

  deleteLottery(lottery: ILottery): Observable<void> {
    // return this.lotteryApi.deleteLottery(id)
    const { id } = lottery;
    this.lotterys.update((lotterys) => {
      return lotterys.filter((lottery) => lottery.id !== id);
    });

    return of(lottery).pipe(
      delay(this.delayCount()),
      tap((lottery) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Listo!',
          detail: `${lottery.name} eliminada exitosamente`,
        });
      }),
      switchMap(() => EMPTY)
    );
  }
}
