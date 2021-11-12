import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss'],
})
export class TablePopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TablePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }
}
