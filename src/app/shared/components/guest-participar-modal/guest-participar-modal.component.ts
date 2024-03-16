import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-guest-participar-modal',
  standalone: true,
  imports: [ FormsModule, ButtonModule, DialogModule, ToastModule],
  providers: [MessageService],
  templateUrl: './guest-participar-modal.component.html',
  styleUrl: './guest-participar-modal.component.scss',
})
export class GuestParticiparModalComponent {
  @Input() label: string = 'label';
  @Input() icon: string = 'pi pi-user';
  @Input() severity: string = '';
  messageService = inject(MessageService);
  discordUser: string = '';
  isUserParticipating: boolean = false;
  visible: boolean = false;
  duplicateToast: boolean = false;

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

    if(this.isUserParticipating) {
      this.messageService.add({
        key: 'tc',
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
        key: 'tc',
        severity: 'error',
        summary: 'Error',
        detail: 'El campo usuario es requerido',
      });
      return;
    }

    this.duplicateToast = false;
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: '!Suerte¡',
      detail: `Usuario ${this.discordUser} registrado con éxito`,
    });
    this.closeDialog();
  }
}
