import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'mf1',
    loadChildren: () => import('mf1/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'mf2',
    loadChildren: () => import('mf2/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'shelveProducts',
    loadChildren: () => import('shelveProducts/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('mf1/Routes').then((m) => m!.remoteRoutes),
  },
];
