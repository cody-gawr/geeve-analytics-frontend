import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from '../demo-material-module';
import { RolesRoutes } from './roles.routing';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RolesComponent } from './roles.component';

import { RolesService } from './roles.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RolesRoutes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDatepickerModule,
    DemoMaterialModule,
  ],
  providers: [RolesService],
  declarations: [RolesComponent],
})
export class RolesModule {}
