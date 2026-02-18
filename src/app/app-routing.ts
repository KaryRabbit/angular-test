import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-module/user-module.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./post-module/post-module.routes').then((m) => m.POST_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
