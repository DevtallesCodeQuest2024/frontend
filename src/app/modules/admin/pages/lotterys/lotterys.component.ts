import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { LotteryCardComponent } from '@app/shared/components/lottery-card/lottery-card.component';
import { LotteryService } from '@app/modules/admin/services/lottery.service';

@Component({
  selector: 'app-lotterys',
  standalone: true,
  imports: [LotteryCardComponent],
  templateUrl: './lotterys.component.html',
  styleUrl: './lotterys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LotterysComponent {
  lotteryService = inject(LotteryService);

  lotterys = computed(() => this.lotteryService.lotterys());

  constructor() {
    this.lotteryService.getAllLotterys().subscribe((lotterys) => {
      this.lotteryService.lotterys.set(lotterys);
    });
  }
}
