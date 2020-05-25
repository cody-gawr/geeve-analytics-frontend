import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClinicSettingsRoutes } from './clinic-settings.routing';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ClinicSettingsComponent,DialogOverviewExampleDialogComponent } from './clinic-settings.component';

import { ClinicSettingsService } from './clinic-settings.service';

import { AngularFileUploaderModule } from "angular-file-uploader";

import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClinicSettingsRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    QuillModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTreeModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFileUploaderModule,
    NgxEditorModule
  ],
  providers: [
    ClinicSettingsService,DialogOverviewExampleDialogComponent
  ],
  declarations: [
    ClinicSettingsComponent,DialogOverviewExampleDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent]
})



export class ClinicSettingsModule {}
