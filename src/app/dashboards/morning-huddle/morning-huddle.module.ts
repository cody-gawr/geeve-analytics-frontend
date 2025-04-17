import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MorningHuddleComponent, DialogOverviewExampleDialogComponent, StatusDialogMHComponent } from './morning-huddle.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MorningHuddleComponent,
        DialogOverviewExampleDialogComponent,
        StatusDialogMHComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        FormsModule
    ]
})
export class MorningHuddleModule { } 