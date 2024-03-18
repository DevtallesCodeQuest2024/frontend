import { Component, computed, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@app/core/auth/auth.service';
import { JoinLotteryService } from '@app/core/services/join-lottery.service';
import { ILottery } from '@app/core/models/loterry';
import { LotteryService } from '@app/modules/lottery/services/lottery.service';

type Size = 'small' | 'large' | undefined;

@Component({
  selector: 'app-guest-participar-modal',
  standalone: true,
  imports: [FormsModule, ButtonModule, DialogModule, ToastModule],
  providers: [MessageService],
  templateUrl: './guest-participar-modal.component.html',
  styleUrl: './guest-participar-modal.component.scss',
})
export class GuestParticiparModalComponent {
  @Input() label: string = 'label';
  @Input() icon: string = 'pi pi-user';
  @Input() severity: string = '';
  @Input() size: Size = undefined;
  @Input() key: string = 'bc';
  @Input({ required: true }) set lottery(lot: ILottery) {
    this._lottery?.set(lot);
  }
  messageService = inject(MessageService);
  discordUser: string = '';
  isUserParticipating: boolean = false;
  visible: boolean = false;
  duplicateToast: boolean = false;

  private joinLotteryService = inject(JoinLotteryService);
  private lotteryService = inject(LotteryService);
  private authService = inject(AuthService);

  _lottery = signal<ILottery | null>(null);

  public joined = computed<boolean>(() => {
    return !!this._lottery()!.users?.some(
      (user) => user.id === this.authService.authUser()?.id
    );
  });

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  register() {
    if (this.isUserParticipating) {
      this.messageService.add({
        key: this.key,
        severity: 'warn',
        summary: 'Alerta',
        detail: `El usuario ${this.discordUser} ya esta participando`,
      });
      this.closeDialog();
      return;
    }

    if (this.discordUser === '') {
      this.duplicateToast = true;
      this.messageService.add({
        key: this.key,
        severity: 'error',
        summary: 'Error',
        detail: 'El campo usuario es requerido',
      });
      return;
    }

    this.duplicateToast = false;
    this.messageService.add({
      key: this.key,
      severity: 'success',
      summary: '!Suerte¡',
      detail: `Usuario ${this.discordUser} registrado con éxito`,
    });
    this.closeDialog();
  }

  joinwithDiscord() {
    if (this.authService.authUser()) {
      this.joinLotteryService.joinLottery(this._lottery()!.id!).subscribe({
        next: (lottery) => {
          this._lottery.set(lottery);
          this.closeDialog();
        },
        error: () => {
          this.closeDialog();
        },
      });
    } else {
      this.authService.joinWithDiscord().subscribe();
    }
  }
}
