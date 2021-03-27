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

import { PaymentRoutes } from './payment.routing';
import { PaymentComponent } from './payment.component';
import { PaymentService } from './payment.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PaymentService
  ],
  declarations: [
    PaymentComponent
  ]
})
export class PaymentModule {}
