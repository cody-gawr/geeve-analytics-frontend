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
import { FinanceExpensesComponent } from './components/finances/none-trend/expenses/expenses.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule as ChartsModule } from 'ng2-charts';
import { FinanceProdPerClinicComponent } from './components/finances/none-trend/prod-per-clinic/prod-per-clinic.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { FinanceProdPerVisitComponent } from './components/finances/none-trend/prod-per-visit/prod-per-visit.component';
import { FinanceTotalDiscountComponent } from './components/finances/none-trend/total-discount/total-discount.component';
import { FinanceProdColComponent } from './components/finances/none-trend/prod-collection/prod-collection.component';
import { NoneTrendFinanceComponent } from './components/finances/none-trend/none-trend.component';
import { FinanceProdTrendComponent } from './components/finances/trend/production/production.component';
import { TrendFinanceComponent } from './components/finances/trend/trend.component';
import { FinanceProdPerVisitTrendComponent } from './components/finances/trend/prod-per-visit-trend/prod-per-visit-trend.component';
import { FinanceExpenseTrendComponent } from './components/finances/trend/expense-trend/expense-trend.component';
import { FinanceProdPerClinicTrendComponent } from './components/finances/trend/prod-per-clinic-trend/prod-per-clinic-trend.component';
import { FinanceTotalDiscountTrendComponent } from './components/finances/trend/total-discount-trend/total-discount-trend.component';
import { FinanceProdColTrendComponent } from './components/finances/trend/prod-col-trend/prod-col-trend.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeature),
    StoreModule.forFeature(financeFeature),
    EffectsModule.forFeature([DashboardEffects, FinanceEffects]),
    AppLayoutModule,
    NgxChartsModule,
    ChartsModule,
    NgxGaugeModule
  ],
  declarations: [
    FinancesComponent, 
    NoneTrendFinanceComponent,
    TrendFinanceComponent,

    FinanceExpensesComponent,
    FinanceProdPerClinicComponent,
    FinanceProdPerVisitComponent,
    FinanceTotalDiscountComponent,
    FinanceProdColComponent,
    FinanceProdTrendComponent,
    FinanceProdPerVisitTrendComponent,
    FinanceExpenseTrendComponent,
    FinanceProdPerClinicTrendComponent,
    FinanceTotalDiscountTrendComponent,
    FinanceProdColTrendComponent
  ],
  providers: [
    DashboardService, 
    DashboardFacade, 
    FinanceService, 
    FinanceFacade
  ]
})
export class DashboardModule {}
