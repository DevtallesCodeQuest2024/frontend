import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LotteryCardComponent } from '@app/shared/components/lottery-card/lottery-card.component';
import { LotteryService } from '@app/modules/lottery/services/lottery.service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-lotterys',
  standalone: true,
  imports: [RouterOutlet, LotteryCardComponent, AsyncPipe],
  templateUrl: './lotterys.component.html',
  styleUrl: './lotterys.component.scss',
})
export default class LotterysComponent {
  lotteryService = inject(LotteryService);

  lotterys = computed(() => this.lotteryService.lotterys());

  constructor() {
    this.lotteryService.getPublicLotterys().pipe(takeUntilDestroyed()).subscribe();
  }
}
