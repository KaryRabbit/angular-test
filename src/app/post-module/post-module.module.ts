import { NgModule } from '@angular/core';
import { JsonplaceholderApiService } from './jsonplaceholder-api.service';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { PostModuleRoutingModule } from './post-module-routing.module';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostPopupComponent } from './create-post-popup/create-post-popup.component';

@NgModule({
  declarations: [PostsTableComponent, CreatePostFormComponent, CreatePostPopupComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    PostModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [JsonplaceholderApiService],
})
export class PostModuleModule {}
