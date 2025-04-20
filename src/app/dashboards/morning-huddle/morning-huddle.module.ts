import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MorningHuddleComponent,
  DialogOverviewExampleDialogComponent,
  StatusDialogMHComponent,
} from './morning-huddle.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FormsModule } from '@angular/forms';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { CallLogPanelComponent } from './call-log-panel/call-log-panel.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    MorningHuddleComponent,
    DialogOverviewExampleDialogComponent,
    StatusDialogMHComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatTabsModule,
    CallLogPanelComponent,
    ConfirmDialogComponent,
  ],
})
export class MorningHuddleModule {}
