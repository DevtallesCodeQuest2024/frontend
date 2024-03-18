import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./not-community/not-community.component'),
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./register/register.component'),
  },
] satisfies Route[];
