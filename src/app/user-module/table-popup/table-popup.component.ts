import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../reqres-api.service';

@Component({
  selector: 'app-table-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss'],
})
export class TablePopupComponent {
  readonly dialogRef = inject(MatDialogRef<TablePopupComponent>);
  readonly data: { user: User } = inject(MAT_DIALOG_DATA);

  closeModal(): void {
    this.dialogRef.close();
  }
}
