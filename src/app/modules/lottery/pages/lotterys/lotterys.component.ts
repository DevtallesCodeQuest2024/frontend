import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LotteryCardComponent } from '@app/shared/components/lottery-card/lottery-card.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-lotterys',
  standalone: true,
  imports: [RouterOutlet, LotteryCardComponent, AsyncPipe],
  templateUrl: './lotterys.component.html',
  styleUrl: './lotterys.component.scss',
})
export default class LotterysComponen implements OnInit {
  lotterys: Observable<number[]> = of([]);
  ngOnInit(): void {
    this.lotterys = of([1, 2, 3, 4, 5, 6, 7, 8]);
  }
}
