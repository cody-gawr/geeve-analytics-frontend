import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { XeroRoutes } from './xero.routing';
import { XeroComponent } from './xero.component';
import { XeroService } from './xero.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(XeroRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    XeroService
  ],
  declarations: [
    XeroComponent,
  ]
})
export class XeroModule {}
