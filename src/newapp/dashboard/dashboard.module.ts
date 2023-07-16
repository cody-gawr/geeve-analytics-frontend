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
import { FinanceService } from './services/finance.service';
import { FinanceFacade } from './facades/finance.facade';
import { FinanceEffects } from './state/effects/finance.effects';
import { financeFeature } from './state/reducers/finance.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeature),
    StoreModule.forFeature(financeFeature),
    EffectsModule.forFeature([DashboardEffects, FinanceEffects]),
    AppLayoutModule
  ],
  declarations: [FinancesComponent],
  providers: [DashboardService, DashboardFacade, FinanceService, FinanceFacade]
})
export class DashboardModule {}
