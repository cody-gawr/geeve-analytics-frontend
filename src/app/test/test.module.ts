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
import { NgxStripeModule } from 'ngx-stripe';
import { TestRoutes } from './test.routing';
import { TestComponent } from './test.component';
import { TestService } from './test.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TestRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc'),
  ],
  providers: [
    TestService
  ],
  declarations: [
    TestComponent,
  ]
})
export class TestModule {}
