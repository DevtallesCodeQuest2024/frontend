import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/lotterys/lotterys.component'),
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./pages/lottery/lottery.component'),
  },
] satisfies Route[];
