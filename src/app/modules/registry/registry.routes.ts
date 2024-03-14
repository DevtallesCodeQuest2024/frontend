import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/pre-registry/pre-registry.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/registry/registry.component'),
  },
] satisfies Route[];
