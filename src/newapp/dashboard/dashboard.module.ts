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
import { ClinicianProcedureComponent } from './components/clinician-procedures/clinician-procedures.component';
import { CpAnalysisComponent } from './components/clinician-procedures/components/procedure-analysis/procedure-analysis.component';
import { CpRevPerProcedureComponent } from './components/clinician-procedures/components/rev-per-procedure/rev-per-procedure.component';
import { CpPredictorRatioComponent } from './components/clinician-procedures/components/predictor-ratio/predictor-ratio.component';
import { CpClinicianReferralsComponent } from './components/clinician-procedures/components/clinician-referrals/clinician-referrals.component';
import { ClinicianProcedureService } from './services/clinician-procedure.service';
import { clinicianProcedureFeature } from './state/reducers/clinician-procedure.reducer';
import { ClinicianProcedureEffects } from './state/effects/clinician-procedure.effects';
import { ClinicianProcedureFacade } from './facades/clinician-procedures.facade';
import { MkSelectExpensesModalComponent } from './components/finances/none-trend/select-expenses-modal/select-expenses-modal.component';
import { clinicianAnalysisFeature } from './state/reducers/clinician-analysis.reducer';
import { ClinicianAnalysisEffects } from './state/effects/clinician-analysis.effects';
import { ClinicianAnalysisService } from './services/clinician-analysis.service';
import { ClinicianAnalysisFacade } from './facades/clinician-analysis.facade';
import { ClinicianAnalysisComponent } from './components/clinician-analysis/clinician-analysis.component';
import { CaProductionComponent } from './components/clinician-analysis/components/caProduction/caProduction.component';
import { CaHourlyRateComponent } from './components/clinician-analysis/components/caHourlyRate/caHourlyRate.component';
import { CaNumNewPatientsComponent } from './components/clinician-analysis/components/caNumNewPatients/caNumNewPatients.component';
import { CaTxPlanAvgFeedsComponent } from './components/clinician-analysis/components/caTxPlanAvgFees/caTxPlanAvgFees.component';
import { CaTxPlanCompRateComponent } from './components/clinician-analysis/components/caTxPlanCompRate/caTxPlanCompRate.component';
import { CaRecallRateComponent } from './components/clinician-analysis/components/caRecallRate/caRecallRate.component';
import { CaNumComplaintsComponent } from './components/clinician-analysis/components/caNumComplaints/caNumComplaints.component';
import { followupsFeature } from './state/reducers/followups.reducer';
import { FollowupsEffects } from './state/effects/followups.effects';
import { FollowupsFacade } from './facades/followups.facade';
import { FuGetConversionComponent } from './components/followups/components/fuGetConversion/fuGetConversion.component';
import { FuGetConversionPerUserComponent } from './components/followups/components/fuGetConversionPerUser/fuGetConversionPerUser.component';
import { FuGetFollowupCompletionComponent } from './components/followups/components/fuGetFollowupCompletion/fuGetFollowupCompletion.component';
import { FuGetOutcomeComponent } from './components/followups/components/fuGetOutcome/fuGetOutcome.component';
import { FuGetPerUserComponent } from './components/followups/components/fuGetPerUser/fuGetPerUser.component';
import { FollowupsComponent } from './components/followups/followups.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeature),
    StoreModule.forFeature(financeFeature),
    StoreModule.forFeature(marketingFeature),
    StoreModule.forFeature(frontDeskFeature),
    StoreModule.forFeature(clinicianProcedureFeature),
    StoreModule.forFeature(clinicianAnalysisFeature),
    StoreModule.forFeature(followupsFeature),
    EffectsModule.forFeature([
      DashboardEffects,
      FinanceEffects,
      MarketingEffects,
      FrontDeskEffects,
      ClinicianProcedureEffects,
      ClinicianAnalysisEffects,
      FollowupsEffects,
    ]),
    AppLayoutModule,
    NgxChartsModule,
    ChartsModule,
    NgxGaugeModule,
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
    MkSelectExpensesModalComponent,

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
    FrontDeskUtaRatioComponent,

    ClinicianProcedureComponent,
    CpAnalysisComponent,
    CpRevPerProcedureComponent,
    CpPredictorRatioComponent,
    CpClinicianReferralsComponent,

    ClinicianAnalysisComponent,
    CaProductionComponent,
    CaHourlyRateComponent,
    CaNumNewPatientsComponent,
    CaTxPlanAvgFeedsComponent,
    CaTxPlanCompRateComponent,
    CaRecallRateComponent,
    CaNumComplaintsComponent,

    FollowupsComponent,
    FuGetConversionComponent,
    FuGetConversionPerUserComponent,
    FuGetFollowupCompletionComponent,
    FuGetOutcomeComponent,
    FuGetPerUserComponent,
  ],
  providers: [
    DashboardService,
    DashboardFacade,
    FinanceService,
    FinanceFacade,
    MarketingService,
    MarketingFacade,
    FrontDeskFacade,
    ClinicianProcedureService,
    ClinicianProcedureFacade,
    ClinicianAnalysisService,
    ClinicianAnalysisFacade,
    FollowupsFacade,
  ],
})
export class DashboardModule {}
