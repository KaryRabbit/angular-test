import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.scss']
})
export class CreatePostPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreatePostPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }
}
