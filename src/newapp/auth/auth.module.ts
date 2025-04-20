import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

import { AuthService } from '../shared/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';
import { authFeature } from './state/reducers/auth.reducer';
import { AuthFacade } from './facades/auth.facade';
import { ForgotPasswordCardComponent } from './components/forgot-password/forgot-password-card.component';

const components = [LoginComponent, LoginCardComponent, ForgotPasswordCardComponent];
const services = [AuthService, AuthFacade];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [...components],
  providers: [...services],
})
export class AuthModule {}
