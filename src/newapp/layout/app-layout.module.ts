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
import { MenuService } from '../shared/services/menu.service';
import { clinicFeature } from '../clinic/state/reducers/clinic.reducer';
import { ClinicEffects } from '../clinic/state/effects/clinic.effects';
import { AppLayoutService } from './services/app-layout.service';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { CommonModule } from '@angular/common';

const components = [
  AppTopbarComponent,
  AppLayoutComponent,
  AppSidebarComponent,
  AppMenuComponent
];

const services = [AuthFacade, MenuService, AppLayoutService, ClinicFacade];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(clinicFeature),
    EffectsModule.forFeature([AuthEffects, ClinicEffects])
  ],
  declarations: [...components],
  exports: [AppLayoutComponent],
  providers: [...services]
})
export class AppLayoutModule {}
