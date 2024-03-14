import { Route } from '@angular/router';
import { LotteryService } from './services/lottery.service';

export default [
  {
    path: 'sorteos',
    loadComponent: () => import('./pages/lotterys/lotterys.component'),
    providers: [LotteryService],
  },
  {
    path: 'sorteo/agregar',
    loadComponent: () =>
      import('./pages/add-or-edit-lottery/add-or-edit-lottery.component'),
    pathMatch: 'full',
  },
  {
    path: 'sorteo/:id/editar',
    loadComponent: () =>
      import('./pages/add-or-edit-lottery/add-or-edit-lottery.component'),
  },
  {
    path: 'sorteo/:id',
    loadComponent: () => import('./pages/lottery/lottery.component'),
  },
  {
    path: 'ganadores',
    loadComponent: () => import('./pages/winners/winners.component'),
  },
  {
    path: '',
    redirectTo: 'sorteos',
    pathMatch: 'full',
  },
] satisfies Route[];
