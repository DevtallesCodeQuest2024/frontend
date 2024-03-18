import { Route } from '@angular/router';

export default [
  {
    path: 'registro',
    loadComponent: () => import('./register/register.component'),
  },
  {
    path: 'error',
    loadComponent: () => import('./not-community/not-community.component'),
  },
] satisfies Route[];
