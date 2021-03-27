import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { SetupRoutes } from './setup.routing';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { SetupService } from './setup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicService } from '../clinic/clinic.service';
import { PlansService } from '../plans/plans.service';
@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SetupRoutes),
    MatInputModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
       SetupService,ClinicService,PlansService
  ]
 
})
export class SetupModule { }
