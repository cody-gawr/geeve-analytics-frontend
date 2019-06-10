import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule, DatePipe } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardsRoutes } from './dashboards.routing';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClinicianAnalysisService } from './cliniciananalysis/cliniciananalysis.service';
import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
import { ClinicianProceeduresService } from './clinicianproceedures/clinicianproceedures.service';
import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';
import { DentistService } from '../dentist/dentist.service';
import { NgxGaugeModule } from 'ngx-gauge';

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
    ChartistModule,
    ChartsModule,
    NgxChartsModule,
    NgxGaugeModule
  ],
  providers: [ ClinicianAnalysisService, ClinicianProceeduresService, DentistService,DatePipe],
  declarations: [ClinicianAnalysisComponent, ClinicianProceeduresComponent]
})
export class DashboardsModule {}
