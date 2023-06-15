import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { LoginService } from '../login/login.service';
import { RecaptchaModule } from "ng-recaptcha";
import { RECAPTCHA_NONCE } from "ng-recaptcha";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  providers: [
    LoginService,
    {
      provide: RECAPTCHA_NONCE,
      useValue: "IbBkVHsydYPDr9AUKkljYF6z9kOl1361",
    },
  ],  
  declarations: [
    ErrorComponent,
    ForgotComponent,
    ResetComponent
  ]
})
export class AuthenticationModule {}
