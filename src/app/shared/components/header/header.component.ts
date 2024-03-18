import {
  Component,
  Input,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AuthService } from '@app/core/auth/auth.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, NgOptimizedImage, ButtonModule, NgClass],
  template: `
    <header [ngClass]="{ admin: isAdmin }">
      <p-menubar [model]="isAdmin ? menus() : menuDiscord()">
        <ng-template pTemplate="start">
          <div
            class="header__img relative h-full w-full flex align-items-center"
          >
            <img
              ngSrc="assets/LOGOBLANCO.png"
              class="px-2"
              height="36"
              width="195"
              priority
            />
          </div>
        </ng-template>
        @if(!isAdmin && !this.authService.authUser()){
        <ng-template pTemplate="end">
          <button
            pButton
            label="Inicia sesión con Discord"
            icon="pi pi-discord"
            class="bg-primary-700"
            (click)="joinwithDiscord()"
          ></button>
        </ng-template>
        }
      </p-menubar>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);

  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  private userName = computed<string>(() => {
    if (this.authService.authUser()?.discordUsername) {
      return `${this.authService.authUser()?.discordUsername}`;
    }

    return `${this.authService.authUser()?.firstName} ${
      this.authService.authUser()?.lastName
    }`;
  });

  private items = signal<MenuItem[]>([
    {
      label: 'Sorteos',
      icon: 'pi pi-fw pi-chevron-down',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: '/admin/dashboard',
        },
        {
          label: 'Lista sorteos',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: '/admin/dashboard/sorteos',
        },
        {
          label: 'Ganadores',
          icon: 'pi pi-users',
          routerLink: '/admin/dashboard/ganadores',
        },
      ],
    },
    {
      label: this.userName(),
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-power-off',
          command: () => this.logout(),
        },
      ],
    },
  ]);

  menus = computed(() => {
    const [, userMenu] = this.items();
    const isMobile = window.matchMedia('(max-width: 960px)').matches;
    return isMobile && this.isAdmin ? this.items() : [userMenu];
  });

  menuDiscord = computed(() => {
    const [, userMenu] = this.items();
    if (this.authService.authUser()) {
      return [userMenu];
    }
    return [];
  });

  logout() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que quieres cerrar sesión?',
      header: 'Cerrar Sesión',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      key: 'dialog',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.authService.logout(),
    });
  }

  joinwithDiscord() {
    this.authService.joinWithDiscord().subscribe();
  }
}
