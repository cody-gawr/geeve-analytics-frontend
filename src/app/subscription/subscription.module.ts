import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent} from './subscription.component';
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
import { SubscriptionService } from './subscription.service';
import {MatDialogModule} from '@angular/material';
import { RegisterModule } from './register/register.module';
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
    ReactiveFormsModule,
    MatDialogModule,
    RegisterModule
  ],
  providers: [
    SubscriptionService
  ],
  declarations: [SubscriptionComponent],
  exports: [SubscriptionComponent]

})
export class SubscriptionModule {}
