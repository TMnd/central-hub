import { PortalHomeComponent } from './portal-home.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'videoGameCatalog',
    loadChildren: () =>
      import('videoGameCatalog/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'shelveProducts',
    loadChildren: () =>
      import('shelveProducts/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: PortalHomeComponent,
  },
];
