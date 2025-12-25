import { NgModule } from '@angular/core';
import { JsonplaceholderApiService } from './jsonplaceholder-api.service';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
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
