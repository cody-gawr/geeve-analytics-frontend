import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  inProgress?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div mat-dialog-title>{{ data.title }}</div>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
      <div *ngIf="data.inProgress" class="progress-container">
        <mat-spinner diameter="24"></mat-spinner>
        <span class="progress-text">Scheduling calls in progress...</span>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false" *ngIf="!data.inProgress">{{ data.cancelText }}</button>
      <button mat-button color="warn" [mat-dialog-close]="'cancel'" *ngIf="data.inProgress">Cancel Schedule</button>
      <button mat-button color="primary" [mat-dialog-close]="true" *ngIf="!data.inProgress">{{ data.confirmText }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
    mat-dialog-content {
      margin: 16px 0;
      min-width: 300px;
    }
    mat-dialog-actions {
      padding: 8px 0;
    }
    .progress-container {
      display: flex;
      align-items: center;
      margin-top: 16px;
    }
    .progress-text {
      margin-left: 16px;
      color: rgba(0, 0, 0, 0.87);
    }
  `],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }
} 