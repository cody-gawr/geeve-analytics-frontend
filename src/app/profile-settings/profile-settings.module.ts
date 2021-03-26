import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileSettingsRoutes } from './profile-settings.routing';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ProfileSettingsService } from './profile-settings.service';
import { NgxStripeModule } from 'ngx-stripe';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileSettingsRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDatepickerModule,
    NgxEditorModule,
    NgxStripeModule.forRoot(''),
  ],
  providers: [
    ProfileSettingsService
  ],
  declarations: [
    ProfileSettingsComponent
  ]
})
export class ProfileSettingsModule {}
