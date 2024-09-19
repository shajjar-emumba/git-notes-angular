import { Routes } from '@angular/router';

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
  },
  {
    path: 'create-gists',
    loadComponent: () =>
      import('./pages/create-gist/create-gist.component').then(
        (m) => m.CreateGistComponent
      ),
  },
];
