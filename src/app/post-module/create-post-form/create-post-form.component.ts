import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePostPopupComponent } from '../create-post-popup/create-post-popup.component';
import { JsonplaceholderApiService } from '../jsonplaceholder-api.service';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent implements OnInit {
  createForm;
  CreatedData;

  constructor(
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
    private jsonplaceholderApiService: JsonplaceholderApiService
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      userId: [null, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required],
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

    const postObser = this.jsonplaceholderApiService.createPost(data);
    postObser.subscribe((response) => {
      dialogConfig.data = {
        post: response,
      };
      this.matDialog.open(CreatePostPopupComponent, dialogConfig);
    });
  }
}
