import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserPopupComponent } from '../create-user-popup/create-user-popup.component';
import { ReqresApiService } from '../reqres-api.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly reqresApiService = inject(ReqresApiService);
  private readonly toast = inject(ToastService);

  createForm!: FormGroup;
  submitting = false;

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid || this.submitting) {
      this.createForm.markAllAsTouched();
      this.toast.warning('Please fill all required fields');
      return;
    }

    this.submitting = true;

    this.reqresApiService.createUser(this.createForm.value).subscribe({
      next: (response) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '420px';
        dialogConfig.data = { user: response };
        this.dialog.open(CreateUserPopupComponent, dialogConfig);
        this.toast.success('User created successfully!');
        this.createForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.toast.error('Failed to create user. Please try again.');
        this.submitting = false;
      },
    });
  }
}
