import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-not-community',
  standalone: true,
  imports: [],
  templateUrl: './not-community.component.html',
  styleUrl: './not-community.component.scss',
})
export default class NotCommunityComponent {
  //services
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public token: string | null = null;

  constructor() {
    this.token = this.route.snapshot.queryParamMap.get('error');

    if (this.token) {
      this.verifyToken();
    } else {
      this.router.navigate(['/']);
    }
  }

  verifyToken(): void {
    try {
      const parts = this.token!.split('.');
      const encodedPayload = parts[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);
      console.log(payload);
      this.messageService.add({
        key: 'toast',
        severity: 'info',
        summary: `${payload.discordUsername}!`,
        detail: 'Parece que no eres parte del la comunidad de devtalles',
        sticky: true,
      });
    } finally {
      this.router.navigate(['/']);
    }
  }
}
