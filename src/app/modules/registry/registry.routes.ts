import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/pre-registry/pre-registry.component'),
  },
  {
    path: 'verificar',
    loadComponent: () => import('./pages/verify/verify.component'),
  },
] satisfies Route[];
