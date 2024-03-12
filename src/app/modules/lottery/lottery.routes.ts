import { Route } from '@angular/router';

export default [
  {
    path:"",
    loadComponent: () => import('./pages/lotterys/lotterys.component')
  },
  {
    path:'sorteo',
    loadComponent: () => import('./pages/lottery/lottery.component')
  }
] satisfies Route[]
