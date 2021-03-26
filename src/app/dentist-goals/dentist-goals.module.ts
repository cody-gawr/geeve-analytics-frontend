import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DentistGoalsRoutes } from './dentist-goals.routing';
import { QuillModule } from 'ngx-quill';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { DentistGoalsComponent } from './dentist-goals.component';

import { DentistGoalsService } from './dentist-goals.service';
import { DentistService } from '../dentist/dentist.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DentistGoalsRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    QuillModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    DentistGoalsService, DentistService
  ],
  declarations: [
    DentistGoalsComponent
  ]
})
export class DentistGoalsModule {}
