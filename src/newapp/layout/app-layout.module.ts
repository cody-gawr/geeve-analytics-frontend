import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AuthFacade } from '../auth/facades/auth.facade';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/state/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authFeature } from '../auth/state/reducers/auth.reducer';
import { clinicFeature } from '../clinic/state/reducers/clinic.reducer';
import { ClinicEffects } from '../clinic/state/effects/clinic.effects';
import { AppLayoutService } from './services/app-layout.service';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { CommonModule } from '@angular/common';
import { LayoutFacade } from './facades/layout.facade';
import { layoutFeature } from './state/reducers/layout.reducer';
import { dentistFeature } from '../dentist/state/reducers/dentist.reducer';
import { DentistEffects } from '../dentist/state/effects/dentist.effects';
import { DentistFacade } from '../dentist/facades/dentists.facade';
import { SetupLayoutComponent } from './setup-layout/setup-layout.component';
import { AppSwitchMenu } from './app-switch-menu/app-switch-menu.component';

const components = [
  AppTopbarComponent,
  AppLayoutComponent,
  SetupLayoutComponent,
  AppSidebarComponent,
  AppMenuComponent,
  AppSwitchMenu,
];

const services = [AuthFacade, AppLayoutService, ClinicFacade, LayoutFacade, DentistFacade];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(clinicFeature),
    StoreModule.forFeature(layoutFeature),
    StoreModule.forFeature(dentistFeature),
    EffectsModule.forFeature([AuthEffects, ClinicEffects, DentistEffects]),
  ],
  declarations: [...components],
  exports: [AppLayoutComponent, SetupLayoutComponent],
  providers: [...services],
})
export class AppLayoutModule {}
