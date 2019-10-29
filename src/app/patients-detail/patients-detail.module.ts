import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule,DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { PatientsDetailService } from './patients-detail.service';
import { PatientsDetailComponent,DialogOverviewExampleDialogComponent,UpdatePatientDialogComponent  } from './patients-detail.component';
import { PatientsDetailRoutes } from './patients-detail.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientsDetailRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PatientsDetailService,DatePipe
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdatePatientDialogComponent],
  declarations: [ PatientsDetailComponent,
    DialogOverviewExampleDialogComponent,UpdatePatientDialogComponent ]
})
export class PatientsDetailModule { }