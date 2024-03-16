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
import { MenuItem } from 'primeng/api';

import { ILottery } from '@app/core/models/loterry';
import { LotteryService } from '@app/modules/admin/services/lottery.service';
import { GuestParticiparModalComponent } from '../guest-participar-modal/guest-participar-modal.component';

@Component({
  selector: 'app-lottery-card',
  standalone: true,
  imports: [CardModule, ButtonModule, BadgeModule, RouterLink, MenuModule, GuestParticiparModalComponent],
  templateUrl: './lottery-card.component.html',
  styleUrl: './lottery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotteryCardComponent {
  // Service
  private lotteryService = inject(LotteryService, { optional: true });
  private router = inject(Router);

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
          icon: 'pi pi-refresh',
          command: () => {
            this.goRuteUpdate();
          },
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-times',
          command: () => {
            this.delete();
          },
        },
      ],
    },
  ]);

  goRuteUpdate() {
    this.router.navigate(['admin/dashboard/sorteo', this.lottery.id, 'editar']);
  }

  delete() {
    this.lotteryService!.deleteLottery(this.lottery).subscribe();
  }
}
