import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlansService } from './plans.service';
import { PlansComponent,DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent  } from './plans.component';
import { PlansRoutes } from './plans.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {
  MatFormFieldModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlansRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
     AngularMultiSelectModule,
     MatFormFieldModule
  ],
  providers: [
    PlansService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent],
  declarations: [ PlansComponent,DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent ]
})
export class PlansModule { }