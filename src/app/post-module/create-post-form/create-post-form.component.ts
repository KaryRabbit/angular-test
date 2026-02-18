import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreatePostPopupComponent } from '../create-post-popup/create-post-popup.component';
import { JsonplaceholderApiService } from '../jsonplaceholder-api.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly jsonplaceholderApiService = inject(JsonplaceholderApiService);
  private readonly toast = inject(ToastService);

  createForm!: FormGroup;
  submitting = false;

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      userId: [null, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid || this.submitting) {
      this.createForm.markAllAsTouched();
      this.toast.warning('Please fill all required fields correctly');
      return;
    }

    this.submitting = true;

    this.jsonplaceholderApiService.createPost(this.createForm.value).subscribe({
      next: (response) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '460px';
        dialogConfig.data = { post: response };
        this.dialog.open(CreatePostPopupComponent, dialogConfig);
        this.toast.success('Post created successfully!');
        this.createForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.toast.error('Failed to create post. Please try again.');
        this.submitting = false;
      },
    });
  }
}
