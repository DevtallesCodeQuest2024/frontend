import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { LotteryCardComponent } from '@app/shared/components/lottery-card/lottery-card.component';
import { LotteryService } from '@app/modules/admin/services/lottery.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lotterys',
  standalone: true,
  imports: [
    LotteryCardComponent,
    ButtonModule,
    RippleModule,
    RouterLink,
    DividerModule,
  ],
  templateUrl: './lotterys.component.html',
  styleUrl: './lotterys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LotterysComponent {
  lotteryService = inject(LotteryService);

  lotterys = computed(() => this.lotteryService.lotterys());

  constructor() {
    this.lotteryService.getAllLotterys().pipe(takeUntilDestroyed()).subscribe();
  }
}
