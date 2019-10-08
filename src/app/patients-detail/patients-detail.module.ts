import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { PatientsDetailService } from './patients-detail.service';
import { PatientsDetailComponent,
  DialogOverviewExampleDialogComponent  } from './patients-detail.component';
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
    PatientsDetailService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [ PatientsDetailComponent,
    DialogOverviewExampleDialogComponent ]
})
export class PatientsDetailModule { }