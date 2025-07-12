import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'video_games_catalog',
    loadChildren: () =>
      import('video_games_catalog/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('products/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
