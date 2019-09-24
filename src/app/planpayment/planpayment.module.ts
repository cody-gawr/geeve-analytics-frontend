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

import { PlanpaymentRoutes } from './planpayment.routing';
import { PlanpaymentComponent } from './planpayment.component';

import { LoginService } from '../login/login.service';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlanpaymentRoutes),    
    NgxStripeModule.forRoot('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc'),
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
    LoginService
  ],
  declarations: [
    PlanpaymentComponent,
  ]
})
export class PlanpaymentModule {}
