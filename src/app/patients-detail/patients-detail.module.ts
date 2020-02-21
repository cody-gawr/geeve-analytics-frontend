import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule,DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { PatientsDetailService } from './patients-detail.service';
import { PatientsDetailComponent,DialogOverviewExampleDialogComponent,UpdatePatientDialogComponent, DialogOverviewExportDialogComponent } from './patients-detail.component';
import { PatientsDetailRoutes } from './patients-detail.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientsDetailRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    PatientsDetailService,DatePipe
  ],
  entryComponents: [DialogOverviewExampleDialogComponent, DialogOverviewExportDialogComponent, UpdatePatientDialogComponent],
  declarations: [ PatientsDetailComponent,
    DialogOverviewExampleDialogComponent,UpdatePatientDialogComponent,DialogOverviewExportDialogComponent ]
})
export class PatientsDetailModule { }