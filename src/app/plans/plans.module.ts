import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PlansService } from './plans.service';
import { PlansComponent,DialogOverviewExampleDialogComponent  } from './plans.component';
import { PlansRoutes } from './plans.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlansRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule
  ],
  providers: [
    PlansService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [ PlansComponent,DialogOverviewExampleDialogComponent ]
})
export class PlansModule { }