import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TreatmentsService } from './treatments.service';
import { TreatmentsComponent,
  DialogOverviewExampleDialogComponent,
  UpdateDialogOverviewExampleDialogComponent  } from './treatments.component';
import { TreatmentsRoutes } from './treatments.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TreatmentsRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [
    TreatmentsService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdateDialogOverviewExampleDialogComponent],
  declarations: [ TreatmentsComponent,
    DialogOverviewExampleDialogComponent,UpdateDialogOverviewExampleDialogComponent ]
})
export class TreatmentsModule { }