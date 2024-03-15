import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/not-auth.guard';
import { LotteryService } from '@app/modules/lottery/services/lottery.service';
import { RegistryService } from "@app/modules/registry/services/registry.service";
import { LandingPageComponent } from "@app/shared/pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: 'inicio', component: LandingPageComponent,
  },
  {
    path: 'sorteos',
    loadComponent: () => import('./modules/lottery/pages/layout/layout.component'),
    loadChildren: () => import('./modules/lottery/lottery.routes'),
    providers: [LotteryService],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/page/login/login.component'),
        canActivate: [notAuthGuard],
      },
      {
        path: 'registro',
        loadChildren: () => import('./modules/registry/registry.routes'),
        canActivate: [notAuthGuard],
        providers: [RegistryService],
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/admin/pages/dashboard/dashboard.component'),
        loadChildren: () => import('./modules/admin/admin.routes'),
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/not-found-page/not-found-page.component'),
  },
];
