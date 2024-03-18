import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@app/core/auth/auth.service';

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
  messageService = inject(MessageService);
  discordUser: string = '';
  isUserParticipating: boolean = false;
  visible: boolean = false;
  duplicateToast: boolean = false;

  private authService = inject(AuthService);

  // constructor(private messageService: MessageService) {}

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  checkUserInDiscord() {
    //TODO: Implementar logica para verificar si el usuario esta participando
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
    this.authService.joinWithDiscord().subscribe();
  }
}
