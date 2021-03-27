import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicGoalsRoutes } from './clinic-goals.routing';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClinicGoalsComponent } from './clinic-goals.component';
import { ClinicGoalsService } from './clinic-goals.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClinicGoalsRoutes),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDatepickerModule
  ],
  providers: [
    ClinicGoalsService
  ],
  declarations: [
    ClinicGoalsComponent
  ]
})
export class ClinicGoalsModule {}
