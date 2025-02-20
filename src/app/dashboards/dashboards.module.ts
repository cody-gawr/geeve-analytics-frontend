import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { NgChartsModule as ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './dashboards.routing';
import { ClinicianAnalysisService } from './cliniciananalysis/cliniciananalysis.service';
import { MorningHuddleService } from './morning-huddle/morning-huddle.service';
// import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
// import { ClinicianProceeduresService } from './clinicianproceedures/clinicianproceedures.service';
// import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';
// import { FinancesService } from './finances/finances.service';
// import { FinancesComponent } from './finances/finances.component';
// import { FollowupsComponent } from './followups/followups.component';
// import { FollowupsService } from './followups/followups.service';
// import { FrontDeskComponent } from './frontdesk/frontdesk.component';
// import { FrontDeskService } from './frontdesk/frontdesk.service';
import { HealthScreenComponent } from './healthscreen/healthscreen.component';
import { HealthScreenService } from './healthscreen/healthscreen.service';
// import { MarketingComponent } from './marketing/marketing.component';
// import { MarketingService } from './marketing/marketing.service';
import { DentistService } from '../dentist/dentist.service';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { GaugeChartModule } from 'angular-gauge-chart';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { CurrencySuffixPipe } from '../currency-suffix.pipe';
import { DateMenuBarComponent } from './date-menu-bar/date-menu-bar.component';
import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../demo-material-module';
import { SendReviewDialog } from './morning-huddle/send-review-dialog/send-review-dialog.component';
import { TermsConditionsDialog } from './morning-huddle/terms-conditions-dialog/terms-conditions-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardsRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartsModule,
    // NgxChartsModule,
    NgxGaugeModule,
    NgxDaterangepickerMd.forRoot(),
    MatButtonToggleModule,
    MatIconModule,
    //  GaugeChartModule,
    NgxSmartModalModule.forRoot(),
    SharedModule,
    DemoMaterialModule,
  ],
  providers: [
    ClinicianAnalysisService,
    MorningHuddleService,
    // ClinicianProceeduresService,
    // FinancesService,
    DentistService,
    // FrontDeskService,
    // MarketingService,
    DatePipe,
    DecimalPipe,
    HealthScreenService,
    // FollowupsService,
  ],
  declarations: [
    // ClinicianAnalysisComponent,
    // ClinicianProceeduresComponent,
    CurrencySuffixPipe,
    // FinancesComponent,
    // FrontDeskComponent,
    // MarketingComponent,
    HealthScreenComponent,
    DateMenuBarComponent,
    // FollowupsComponent,
    SendReviewDialog,
    TermsConditionsDialog,
  ],
})
export class DashboardsModule {}
