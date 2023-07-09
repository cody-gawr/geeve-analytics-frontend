import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardFacade } from './facades/dashboard.facade';
import { DashboardService } from './services/dashboard.service';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './state/effects/dashboard.effects';
import { StoreModule } from '@ngrx/store';
import { dashboardFeature } from './state/reducers/dashboard.reducer';
import { FinancesComponent } from './components/finances/finances.component';
import { AppLayoutModule } from '../layout/app-layout.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeature),
    EffectsModule.forFeature([DashboardEffects]),
    AppLayoutModule
  ],
  declarations: [FinancesComponent],
  providers: [DashboardService, DashboardFacade]
})
export class DashboardModule {}
