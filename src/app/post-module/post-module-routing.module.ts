import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { PostsTableComponent } from './posts-table/posts-table.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'posts', component: PostsTableComponent },
  { path: 'createPost', component: CreatePostFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostModuleRoutingModule {}
