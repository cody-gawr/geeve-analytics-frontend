import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClinicService } from './clinic.service';
import { ClinicComponent,
  DialogOverviewExampleDialogComponent,DialogOverviewExampleLimitDialogComponent  } from './clinic.component';
import { ClinicRoutes } from './clinic.routing';
import { SharedMatModule } from '../shared-mat.module';

@NgModule({
  imports: [
    SharedMatModule.forRoot(),
    RouterModule.forChild(ClinicRoutes),
    NgxDatatableModule,
    DemoMaterialModule
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