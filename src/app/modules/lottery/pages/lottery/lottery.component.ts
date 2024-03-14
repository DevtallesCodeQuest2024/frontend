import { Component, inject } from '@angular/core';
import { LotteryService } from '@app/modules/lottery/services/lottery.service';

@Component({
  selector: 'app-lottery',
  standalone: true,
  imports: [],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss',
})
export default class LotteryComponent {
  lotteryService = inject(LotteryService);
  constructor() {
    console.log(this.lotteryService.lotterys());
  }
}
