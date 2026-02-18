import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreatedUser } from '../reqres-api.service';

@Component({
  selector: 'app-create-user-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.scss'],
})
export class CreateUserPopupComponent {
  readonly dialogRef = inject(MatDialogRef<CreateUserPopupComponent>);
  readonly data: { user: CreatedUser } = inject(MAT_DIALOG_DATA);

  closeModal(): void {
    this.dialogRef.close();
  }
}
