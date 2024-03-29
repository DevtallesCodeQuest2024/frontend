import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import {MenuItem, MessageService} from 'primeng/api';

import { ILottery } from '@app/core/models/loterry';
import { LotteryService } from '@app/modules/admin/services/lottery.service';
import { GuestParticiparModalComponent } from '@app/shared/components/guest-participar-modal/guest-participar-modal.component';

@Component({
  selector: 'app-lottery-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    BadgeModule,
    RouterLink,
    MenuModule,
    GuestParticiparModalComponent,
  ],
  templateUrl: './lottery-card.component.html',
  styleUrl: './lottery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotteryCardComponent {
  // Service
  private lotteryAdminService = inject(LotteryService, { optional: true });
  private router = inject(Router);
  private messageService = inject(MessageService);

  // Inputs
  @Input({ required: true }) lottery!: ILottery;
  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  // Menu
  public menus = signal<MenuItem[]>([
    {
      label: 'Opciones',
      items: [
        {
          label: 'Actualizar',
          icon: 'pi pi-pencil',
          command: () => {
            this.goRuteUpdate();
          },
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () =>
            this.lotteryAdminService!.confirmDeleteLottery(this.lottery.id!),
        },
      ],
    },
  ]);

  goRuteUpdate() {
    this.router.navigate([
      '/admin/dashboard/sorteo',
      this.lottery.id,
      'editar',
    ]);
  }

  onChooseWinner() {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Realizando sorteo!',
      detail: "La persona ganadora es...",
    });
  }
}
