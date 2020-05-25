import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClinicService } from './clinic.service';
import { ClinicComponent,
  DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent  } from './clinic.component';
import { ClinicRoutes } from './clinic.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClinicRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClinicService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent],
  declarations: [ ClinicComponent,
    DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent ]
})
export class ClinicModule { }