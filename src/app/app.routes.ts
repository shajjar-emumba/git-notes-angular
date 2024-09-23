import { Routes } from '@angular/router';
import { userGistsResolver } from './resolvers/user-gists.resolver';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'gist/:id',
    loadComponent: () =>
      import('./pages/gist-page/gist-page.component').then(
        (m) => m.GistPageComponent
      ),
  },
  {
    path: 'user-gists',
    loadComponent: () =>
      import('./pages/user-gists-page/user-gists-page.component').then(
        (m) => m.UserGistsPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'manage-gists',
    loadComponent: () =>
      import('./pages/manage-gist/manage-gist.component').then(
        (m) => m.ManageGistComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'manage-gists/:id',
    loadComponent: () =>
      import('./pages/manage-gist/manage-gist.component').then(
        (m) => m.ManageGistComponent
      ),
    resolve: {
      userGists: userGistsResolver,
    },
    canActivate: [authGuard],
  },
];
