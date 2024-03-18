import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ILottery } from '@app/core/models/loterry';
import { LotteryService } from '@app/modules/lottery/services/lottery.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { GuestParticiparModalComponent } from '@app/shared/components/guest-participar-modal/guest-participar-modal.component';
import { ListParticipantsComponent } from '@app/shared/components/list-participants/list-participants.component';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-lottery',
  standalone: true,
  imports: [
    ListParticipantsComponent,
    ButtonModule,
    TagModule,
    DividerModule,
    ButtonModule,
    DatePipe,
    GuestParticiparModalComponent,
  ],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LotteryComponent implements OnInit {
  // Services
  private lotteryService = inject(LotteryService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Variables
  public lotteryId: string | null = null;
  public lottery = signal<ILottery | null>(null);

  constructor() {
    this.lotteryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.lotteryId) {
      const id = Number(this.lotteryId);
      this.lotteryService
        .getLotteryBtId(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (lottery) => this.lottery.set(lottery),
          error: () => this.router.navigateByUrl('/'),
        });
    }
  }
}
