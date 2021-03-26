import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardsRoutes } from './dashboards.routing';
import { ClinicianAnalysisService } from './cliniciananalysis/cliniciananalysis.service';
import { MorningHuddleService } from './morning-huddle/morning-huddle.service';
import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
import { ClinicianProceeduresService } from './clinicianproceedures/clinicianproceedures.service';
import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';
import { FinancesService } from './finances/finances.service';
import { FinancesComponent } from './finances/finances.component';
import { FrontDeskComponent } from './frontdesk/frontdesk.component';
import { FrontDeskService } from './frontdesk/frontdesk.service';
import { HealthScreenComponent } from './healthscreen/healthscreen.component';
import { HealthScreenService } from './healthscreen/healthscreen.service';
import { MarketingComponent } from './marketing/marketing.component';
import { MarketingService } from './marketing/marketing.service';
import { DentistService } from '../dentist/dentist.service';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatButtonToggleModule, MatIconModule} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';               
import { GaugeChartModule } from 'angular-gauge-chart';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DentistProductionChartComponent } from './charts/dentist-production-chart/dentist-production-chart.component';
import { CurrencySuffixPipe } from '../currency-suffix.pipe';
import { DateMenuBarComponent } from './date-menu-bar/date-menu-bar.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardsRoutes),
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartsModule,
    NgxChartsModule,
    NgxGaugeModule,
    AutoCompleteModule,                                                                                                                 
     NgxDaterangepickerMd.forRoot(),
     MatButtonToggleModule, MatIconModule,
     GaugeChartModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ClinicianAnalysisService, MorningHuddleService, ClinicianProceeduresService, FinancesService, DentistService, FrontDeskService, MarketingService, DatePipe, DecimalPipe, HealthScreenService],
  declarations: [ClinicianAnalysisComponent, ClinicianProceeduresComponent, CurrencySuffixPipe, FinancesComponent, FrontDeskComponent, MarketingComponent, HealthScreenComponent, DentistProductionChartComponent, DateMenuBarComponent]
})
export class DashboardsModule {}
