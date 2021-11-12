import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateUserPopupComponent } from '../create-user-popup/create-user-popup.component';
import { ReqresApiService } from '../reqres-api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  createForm;
  CreatedData;

  constructor(
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
    private reqresApiService: ReqresApiService
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, Validators.required],
      job: [null, Validators.required],
    });
  }

  submit() {
    if (!this.createForm.valid) {
      return;
    }
  }

  onSubmit(data) {
    this.openModal(data);
  }

  openModal(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '250px';
    dialogConfig.width = '420px';

    const userObser = this.reqresApiService.createUser(data);
    userObser.subscribe((response) => {
      dialogConfig.data = {
        user: response,
      };
      this.matDialog.open(CreateUserPopupComponent, dialogConfig);
    });
  }
}
