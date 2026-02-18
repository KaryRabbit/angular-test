import { Routes } from '@angular/router';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { PostsTableComponent } from './posts-table/posts-table.component';

export const POST_ROUTES: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', component: PostsTableComponent },
  { path: 'create', component: CreatePostFormComponent },
];
