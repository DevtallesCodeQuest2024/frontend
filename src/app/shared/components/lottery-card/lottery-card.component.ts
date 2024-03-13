import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lottery-card',
  standalone: true,
  imports: [CardModule, ButtonModule, BadgeModule, RouterLink],
  templateUrl: './lottery-card.component.html',
  styleUrl: './lottery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotteryCardComponent {
  @Input({ required: true }) num!: number;
}
