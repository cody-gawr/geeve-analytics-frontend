import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PlansService } from './plans.service';
import { PlansComponent,DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent  } from './plans.component';
import { PlansRoutes } from './plans.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlansRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    PlansService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent],
  declarations: [ PlansComponent,DialogOverviewExampleDialogComponent,UpdatePlanDialogComponent ]
})
export class PlansModule { }