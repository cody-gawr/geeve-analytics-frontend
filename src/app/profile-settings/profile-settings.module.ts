import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileSettingsRoutes } from './profile-settings.routing';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ProfileSettingsService } from './profile-settings.service';
import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileSettingsRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    QuillModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTreeModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxEditorModule
  ],
  providers: [
    ProfileSettingsService
  ],
  declarations: [
    ProfileSettingsComponent
  ]
})
export class ProfileSettingsModule {}
