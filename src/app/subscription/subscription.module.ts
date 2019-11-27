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
import { MatDialogModule} from '@angular/material';
import { RegisterModule } from './register/register.module';
import { ClinicSettingsService } from '../clinic-settings/clinic-settings.service';
//import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlickModule } from 'ngx-slick';

 

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
    RegisterModule,
    SlickModule.forRoot()
  ],
  providers: [
    SubscriptionService,
    ClinicSettingsService
  ],
  bootstrap: [SubscriptionComponent],
  declarations: [SubscriptionComponent],
  exports: [SubscriptionComponent]

})
export class SubscriptionModule {}
