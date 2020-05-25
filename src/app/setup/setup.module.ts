import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule,DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SetupService } from './setup.service';
import { SetupComponent,UpdatePlanDialogComponent  } from './setup.component';
import { SetupRoutes } from './setup.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClinicService } from '../clinic/clinic.service';
import { ClinicSettingsService } from '../clinic-settings/clinic-settings.service';
import { PlansService } from '../plans/plans.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { StepperHeaderService } from '../layouts/stepper/header/header.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SetupRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    AngularMultiSelectModule
  ],
  providers: [
    SetupService,StepperHeaderService,DatePipe,ClinicService, ClinicSettingsService, PlansService, RolesUsersService
  ],
  entryComponents: [UpdatePlanDialogComponent],
  declarations: [ SetupComponent,UpdatePlanDialogComponent]
})
export class SetupModule { }