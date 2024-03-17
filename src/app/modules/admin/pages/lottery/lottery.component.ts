import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ILottery } from '@app/core/models/loterry';
import { LotteryService } from '@app/modules/admin/services/lottery.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { ListParticipantsComponent } from '@app/shared/components/list-participants/list-participants.component';

@Component({
  selector: 'app-lottery',
  standalone: true,
  imports: [
    ListParticipantsComponent,
    RouterLink,
    DividerModule,
    ButtonModule,
    ChipModule,
    DatePipe,
    RippleModule,
  ],
  providers: [LotteryService],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss',
})
export default class LotteryComponent {
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
          error: () => this.router.navigateByUrl('/admin'),
        });
    }
  }

  confirmDeleteLottery() {
    this.lotteryService.confirmDeleteLottery(this.lottery()?.id!);
  }
}
