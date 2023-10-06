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
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(ProfileSettingsRoutes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDatepickerModule,
    NgxStripeModule.forRoot(''),
    SharedModule,
  ],
  providers: [ProfileSettingsService],
  declarations: [ProfileSettingsComponent],
})
export class ProfileSettingsModule {}
