import {
  Component,
  Input,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@app/core/auth/auth.service';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, NgOptimizedImage, NgClass],
  template: `
    <header [ngClass]="{ admin: isAdmin }">
      <p-menubar [model]="isAdmin ? menus() : []">
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
      </p-menubar>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  private userName = computed<string>(
    () =>
      `${this.authService.authUser()?.firstName} ${
        this.authService.authUser()?.lastName
      }`
  );

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

  logout() {
    this.authService.logout();
  }
}
