import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PatientInfoRoutes } from './patient-info.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';

import { PatientInfoComponent,DialogOverviewExampleDialogComponent } from './patient-info.component';

import { PatientInfoService } from './patient-info.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientInfoRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    QuillModule,
    MatInputModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTreeModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    PatientInfoService,
    DatePipe
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    PatientInfoComponent,DialogOverviewExampleDialogComponent
  ]
})
export class PatientInfoModule {}
