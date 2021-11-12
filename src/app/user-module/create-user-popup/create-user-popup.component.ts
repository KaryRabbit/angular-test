import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.scss'],
})
export class CreateUserPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateUserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }
}
