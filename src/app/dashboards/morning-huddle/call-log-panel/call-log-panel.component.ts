import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

interface TranscriptItem {
  timeElapsed: string;
  name: string;
  role: 'system' | 'user' | 'assistant';
  transcript: string;
}

interface CallLogData {
  patientName: string;
  phoneNumber: string;
  providerName: string;
  treatment: string;
  duration: number;
  status: string;
  transcript: TranscriptItem[];
  summary: string;
  call_duration: string;
  call_type: string;
  call_id: string;
  clinic_id: number;
  id: number;
}

@Component({
  selector: 'app-call-log-panel',
  template: `
    <div class="call-log-sidenav">
      <div class="call-log-header">
        <h2>Call Log</h2>
        <button mat-icon-button (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="call-log-content">
        <div class="info-section">
          <h3>Call Information</h3>
          <div class="info-grid">
            <div class="info-item"><strong>Patient:</strong> {{ data.patientName }}</div>
            <div class="info-item"><strong>Phone:</strong> {{ data.phoneNumber }}</div>
            <div class="info-item"><strong>Provider:</strong> {{ data.providerName }}</div>
            <div class="info-item"><strong>Treatment:</strong> {{ data.treatment }}</div>
            <div class="info-item">
              <strong>Call Duration:</strong> {{ formatDuration(data.call_duration) }}
            </div>
            <div class="info-item"><strong>Status:</strong> {{ data.status }}</div>
          </div>
        </div>

        <mat-tab-group>
          <mat-tab label="Summary">
            <div class="tab-content summary-tab">
              <div class="summary-content">
                <markdown [lineHighlight]="true">{{data.summary}}</markdown>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Transcript">
            <div class="tab-content transcript-tab">
              <div
                *ngFor="let item of data.transcript"
                [ngClass]="{
                  'message-item': item.role !== 'system',
                  'system-event': item.role === 'system',
                  'user-message': item.role === 'user',
                  'assistant-message': item.role === 'assistant'
                }"
              >
                <ng-container *ngIf="item.role === 'system'">
                  <div class="system-text">{{ item.transcript }}</div>
                  <div class="time-elapsed">({{ item.timeElapsed }})</div>
                </ng-container>
                <ng-container *ngIf="item.role !== 'system'">
                  <div class="message-header">
                    <span class="speaker-name">
                      <span *ngIf="item.role === 'user'">👤</span>
                      <span *ngIf="item.role === 'assistant'">👩</span>
                      {{ item.name }}
                    </span>
                    <span class="time-elapsed">{{ item.timeElapsed }}</span>
                  </div>
                  <div class="content">{{ item.transcript }}</div>
                </ng-container>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styleUrls: ['./call-log-panel.component.scss'],
  standalone: true,
  providers: [
    MarkdownService
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MarkdownModule
  ]
})
export class CallLogPanelComponent {
  constructor(
    public dialogRef: MatDialogRef<CallLogPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CallLogData,
  ) {}

  formatDuration(duration: string): string {
    const seconds = Math.floor(parseFloat(duration) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
