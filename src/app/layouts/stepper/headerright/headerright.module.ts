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
import { StepperHeaderrightService } from './headerright.service';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StepperHeaderrightService
  ],
  declarations: [
  ]
})
export class StepperHeaderrightModule {

}
