import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule,DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InOfficeService } from './in-office.service';
import { InOfficeComponent,DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent,DialogOverviewExportDialogComponent  } from './in-office.component';
import { InOfficeRoutes } from './in-office.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InOfficeRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    InOfficeService,DatePipe
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent,DialogOverviewExportDialogComponent],
  declarations: [ InOfficeComponent,DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent,DialogOverviewExportDialogComponent ]
})
export class InOfficeModule { }