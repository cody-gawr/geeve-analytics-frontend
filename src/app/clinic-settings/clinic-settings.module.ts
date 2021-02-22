import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { ClinicSettingsRoutes } from './clinic-settings.routing';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ClinicSettingsComponent } from './clinic-settings.component';

import { ClinicSettingsService } from './clinic-settings.service';
import { SharedMatModule } from '../shared-mat.module';
import { BaseComponent } from './base/base.component';
import { DentistComponent } from './dentist/dentist.component';
import { GoalsComponent } from './goals/goals.component';
@NgModule({
  imports: [
    RouterModule.forChild(ClinicSettingsRoutes),
    DemoMaterialModule,
    SharedMatModule,
    QuillModule,    
    FileUploadModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    ClinicSettingsService
  ],
  declarations: [
    ClinicSettingsComponent,
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
export class ClinicSettingsModule {}
