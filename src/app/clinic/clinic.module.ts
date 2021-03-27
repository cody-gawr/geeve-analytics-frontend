import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClinicService } from './clinic.service';
import { ClinicComponent,
  DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent  } from './clinic.component';
import { ClinicRoutes } from './clinic.routing';

@NgModule({
  imports: [
    RouterModule.forChild(ClinicRoutes),
    NgxDatatableModule,
  ],
  providers: [
    ClinicService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent],
  declarations: [ 
    ClinicComponent,
    DialogOverviewExampleDialogComponent,
    DialogOverviewExampleLimitDialogComponent
  ]
})
export class ClinicModule { }