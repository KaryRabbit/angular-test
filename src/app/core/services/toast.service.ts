import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  success(message: string, action = 'Close'): void {
    this.show(message, 'success', action);
  }

  error(message: string, action = 'Close'): void {
    this.show(message, 'error', action);
  }

  info(message: string, action = 'Close'): void {
    this.show(message, 'info', action);
  }

  warning(message: string, action = 'Close'): void {
    this.show(message, 'warning', action);
  }

  private show(message: string, type: ToastType, action: string): void {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      panelClass: [`toast-${type}`],
    };

    this.snackBar.open(message, action, config);
  }
}
