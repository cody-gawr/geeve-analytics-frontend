import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClinicService } from './clinic.service';
import { ClinicComponent,
  DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent  } from './clinic.component';
import { ClinicRoutes } from './clinic.routing';
import { SharedMatModule } from '../shared-mat.module';
import { BaseComponent } from './base/base.component';
import { DentistComponent } from './dentist/dentist.component';
import { GoalsComponent } from './goals/goals.component';
import { DentistService } from '../dentist/dentist.service';
import { DentistGoalsService } from '../dentist-goals/dentist-goals.service';
import { ClinicGoalsService } from '../clinic-goals/clinic-goals.service';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    SharedMatModule.forRoot(),
    RouterModule.forChild(ClinicRoutes),
    NgxDatatableModule,
    DemoMaterialModule
  ],
  providers: [
    ClinicService, DentistService, DentistGoalsService, ClinicGoalsService, ToastrService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent],
  declarations: [ 
    ClinicComponent,
    DialogOverviewExampleDialogComponent,
    DialogOverviewExampleLimitDialogComponent,
    BaseComponent,
    DentistComponent,
    GoalsComponent
  ],
  exports: [
    BaseComponent,
    DentistComponent,
    GoalsComponent
  ]
})
export class ClinicModule { }