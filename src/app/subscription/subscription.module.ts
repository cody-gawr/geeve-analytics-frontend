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

import { SubscriptionRoutes } from './subscription.routing';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionService } from './subscription.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubscriptionRoutes),
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
    SubscriptionService
  ],
  declarations: [
    SubscriptionComponent,
  ]
})
export class SubscriptionModule {}
