import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {} from 'primeng/utils';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, SidebarComponent, MenubarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private authService = inject(AuthService);
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
      label: this.authService.authUser()?.name,
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
    return isMobile ? this.items() : [userMenu];
  });

  logout() {
    this.authService.logout();
  }
}
