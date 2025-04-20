import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClinicService } from './clinic.service';
import {
  ClinicComponent,
  DialogLocationDialogComponent,
  DialogOverviewExampleDialogComponent,
  DialogOverviewExampleLimitDialogComponent,
} from './clinic.component';
import { ClinicRoutes } from './clinic.routing';
import { SharedMatModule } from '../shared-mat.module';
import { SetupService } from '../setup/setup.service';
import { FormsModule } from '@angular/forms';
import { PraktikaConnectionDialogComponent } from './praktika-connection-dialog/praktika-connection-dialog.component';
import { DentallyConnectionDialogComponent } from './dentally-connection-dialog/dentally-connection-dialog.component';
import { MyobConnectionDialogComponent } from './myob-connection-dialog/myob-connection-dialog.component';
import { XeroConnectionDialogComponent } from './xero-connection-dialog/xero-connection-dialog.component';
import { CoreConnectionDialogComponent } from './core-connection-dialog/core-connection-dialog.component';

@NgModule({
  imports: [
    SharedMatModule.forRoot(),
    RouterModule.forChild(ClinicRoutes),
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
  ],
  providers: [ClinicService, SetupService],
  declarations: [
    ClinicComponent,
    DialogOverviewExampleDialogComponent,
    DialogOverviewExampleLimitDialogComponent,
    DialogLocationDialogComponent,
    PraktikaConnectionDialogComponent,
    DentallyConnectionDialogComponent,
    MyobConnectionDialogComponent,
    XeroConnectionDialogComponent,
    CoreConnectionDialogComponent,
  ],
})
export class ClinicModule {}
