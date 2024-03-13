import { Route } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';

export default [
  {
    path: 'sorteos',
    loadComponent: () => import('./pages/lotterys/lotterys.component'),
    canActivate: [authGuard],
  },
  {
    path: 'sorteo/agregar',
    loadComponent: () =>
      import('./pages/add-or-edit-lottery/add-or-edit-lottery.component'),
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'sorteo/:id/editar',
    loadComponent: () =>
      import('./pages/add-or-edit-lottery/add-or-edit-lottery.component'),
    canActivate: [authGuard],
  },
  {
    path: 'sorteo/:id',
    loadComponent: () => import('./pages/lottery/lottery.component'),
    canActivate: [authGuard],
  },
  {
    path: 'ganadores',
    loadComponent: () => import('./pages/winners/winners.component'),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'sorteos',
    pathMatch: 'full',
  },
] satisfies Route[];
