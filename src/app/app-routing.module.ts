import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./post-module/post-module.module').then(
        (m) => m.PostModuleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
