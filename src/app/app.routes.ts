import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
  {
    path: 'sorteos',
    loadComponent: () =>
      import('./modules/lottery/pages/layout/layout.component'),
    loadChildren: () => import('./modules/lottery/lottery.routes'),
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/page/login/login.component'),
        canActivate: [notAuthGuard],
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./modules/admin/pages/registry/registry.component'),
        canActivate: [notAuthGuard],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/admin/pages/dashboard/dashboard.component'),
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
    redirectTo: 'sorteos',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/not-found-page/not-found-page.component'),
  },
];
