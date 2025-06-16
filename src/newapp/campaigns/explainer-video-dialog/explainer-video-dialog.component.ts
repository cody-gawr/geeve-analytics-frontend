import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-explainer-video-dialog',
  templateUrl: './explainer-video-dialog.component.html',
  styleUrls: ['./explainer-video-dialog.component.scss'],
})
export class ExplainerVideoDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ExplainerVideoDialogComponent>) {}

  ngOnInit() {}

  onCloseDialog() {
    this.dialogRef.close();
  }
}
