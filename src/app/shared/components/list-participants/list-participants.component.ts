import { Component, Input } from '@angular/core';
import { IUser } from '@app/core/models/user';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-list-participants',
  standalone: true,
  imports: [ChipModule, DividerModule, MessagesModule],
  templateUrl: './list-participants.component.html',
  styleUrl: './list-participants.component.scss',
})
export class ListParticipantsComponent {
  @Input({ required: true }) participants: IUser[] = [];

  messageNotData = [
    { severity: 'info', summary: 'Aún no hay participantes', detail: '' },
  ];
}
