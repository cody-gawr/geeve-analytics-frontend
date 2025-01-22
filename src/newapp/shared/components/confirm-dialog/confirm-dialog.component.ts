import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogParams { 
    title: string;
    message: string;
    buttonColor?: string;
    hideNoBtn?: boolean;
    okLabel?: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  hideNoButton = false;
  okLabel = 'Yes';
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParams
  ) {
    this.hideNoButton = !!data.hideNoBtn;
    if(data.okLabel){
      this.okLabel = data.okLabel;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}