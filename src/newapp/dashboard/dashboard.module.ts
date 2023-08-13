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
import { MarketingEffects } from './state/effects/marketing.effects';
import { marketingFeature } from './state/reducers/marketing.reducer';
import { MarketingComponent } from './components/marketing/marketing.component';
import { MarketingNewPatientByReferralComponent } from './components/marketing/components/new-patient-by-referral/new-patient-by-referral.component';
import { MarketingRevByReferralComponent } from './components/marketing/components/revenue-by-referral/revenue-by-referral.component';
import { MarketingNumNewPatientsComponent } from './components/marketing/components/num-new-patients/num-new-patients.component';
import { MarketingNewPatientsAcqComponent } from './components/marketing/components/new-patients-acq/new-patients-acq.component';
import { MarketingTotalVisitsComponent } from './components/marketing/components/total-visits/total-visits.component';
import { MarketingService } from '@/app/dashboards/marketing/marketing.service';
import { MarketingFacade } from './facades/marketing.facade';
import { MkSelectAccountsModalComponent } from './components/marketing/components/select-accounts-modal/select-accounts-modal.component';
import { FrontDeskUtilRateComponent } from './components/front-desk/components/utilisation-rate/utilisation-rate.component';
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { frontDeskFeature } from './state/reducers/front-desk.reducer';
import { FrontDeskFacade } from './facades/front-desk.facade';
import { FrontDeskEffects } from './state/effects/front-desk.effects';
import { FrontDeskRecallRateComponent } from './components/front-desk/components/recall-rate/recall-rate.component';
import { FrontDeskReappointRateComponent } from './components/front-desk/components/reappoint-rate/reappoint-rate.component';
import { FrontDeskNumberTicksComponent } from './components/front-desk/components/number-ticks/number-ticks.component';
import { FrontDeskFtaRatioComponent } from './components/front-desk/components/fta-ratio/fta-ratio.component';
import { FrontDeskUtaRatioComponent } from './components/front-desk/components/uta-ratio/uta-ratio.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeature),
    StoreModule.forFeature(financeFeature),
    StoreModule.forFeature(marketingFeature),
    StoreModule.forFeature(frontDeskFeature),
    EffectsModule.forFeature([
      DashboardEffects, 
      FinanceEffects,
      MarketingEffects,
      FrontDeskEffects
    ]),
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
    FinanceProdColTrendComponent,

    MarketingComponent,
    MarketingNewPatientByReferralComponent,
    MarketingRevByReferralComponent,
    MarketingNumNewPatientsComponent,
    MarketingNewPatientsAcqComponent,
    MarketingTotalVisitsComponent,
    MkSelectAccountsModalComponent,

    FrontDeskComponent,
    FrontDeskUtilRateComponent,
    FrontDeskRecallRateComponent,
    FrontDeskReappointRateComponent,
    FrontDeskNumberTicksComponent,
    FrontDeskFtaRatioComponent,
    FrontDeskUtaRatioComponent
  ],
  providers: [
    DashboardService, 
    DashboardFacade, 
    FinanceService, 
    FinanceFacade,
    MarketingService,
    MarketingFacade,
    FrontDeskFacade
  ]
})
export class DashboardModule {}
