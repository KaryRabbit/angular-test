import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../jsonplaceholder-api.service';

@Component({
  selector: 'app-create-post-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.scss'],
})
export class CreatePostPopupComponent {
  readonly dialogRef = inject(MatDialogRef<CreatePostPopupComponent>);
  readonly data: { post: Post } = inject(MAT_DIALOG_DATA);

  closeModal(): void {
    this.dialogRef.close();
  }
}
