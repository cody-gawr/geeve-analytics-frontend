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

import { SupportRoutes } from './support.routing';
import { SupportComponent } from './support.component';
import { SupportService } from './support.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupportRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SupportService
  ],
  declarations: [
    SupportComponent,
  ]
})
export class SupportModule {}
