import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InOfficeService } from './in-office.service';
import { InOfficeComponent,DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent  } from './in-office.component';
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
    InOfficeService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent],
  declarations: [ InOfficeComponent,DialogOverviewExampleDialogComponent,UpdateInOfficeDialogComponent ]
})
export class InOfficeModule { }