import { Injectable, inject, signal } from '@angular/core';
import { LotteryApiService } from "@app/core/api/lottery-api.service";
import { ILottery } from "@app/core/models/loterry";
import { lotterysMockData } from "@app/core/utils/mockData";
import { Observable, delay, map, of } from "rxjs";

@Injectable()
export class LotteryService {
  // services
  private lotteryApi = inject(LotteryApiService);

  // variables
  public lotterys = signal<ILottery[]>([]);
  public delayCount = signal<number>(1500);

  getPublicLotterys(): Observable<ILottery[]> {
    // return this.lotteryApi.getPublicLotterys();
    return of(lotterysMockData).pipe(
      delay(this.delayCount()),
      map((items) => items.filter((i) => i.id !== 8))
    );
  }
}
