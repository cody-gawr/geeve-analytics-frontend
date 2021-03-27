import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClinicSettingsRoutes } from './clinic-settings.routing';
import { ClinicSettingsComponent } from './clinic-settings.component';
import { ClinicSettingsService } from './clinic-settings.service';
import { SharedMatModule } from '../shared-mat.module';
import { BaseComponent } from './base/base.component';
import { DentistComponent } from './dentist/dentist.component';
import { GoalsComponent } from './goals/goals.component';
import { AutofocusDirective } from './auto-focus.directive';

@NgModule({
  imports: [
    RouterModule.forChild(ClinicSettingsRoutes),
    SharedMatModule
  ],
  providers: [
    ClinicSettingsService
  ],
  declarations: [
    ClinicSettingsComponent,
    BaseComponent,
    DentistComponent,
    GoalsComponent,
    AutofocusDirective
  ],
  exports: [
    BaseComponent,
    DentistComponent,
    GoalsComponent
  ]
})
export class ClinicSettingsModule {}
