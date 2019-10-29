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
import { DashboardsService } from './dashboards.service';
import { DashboardsComponent } from './dashboards.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatButtonToggleModule, MatIconModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';               
import { GaugeChartModule } from 'angular-gauge-chart';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import 'chartjs-plugin-annotation';
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
    NgxGaugeModule,
    AutoCompleteModule,                                                                                                                 
    NgxDaterangepickerMd.forRoot(),
    MatButtonToggleModule, MatIconModule,
    GaugeChartModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ DashboardsService,DatePipe],
  declarations: [DashboardsComponent]
})
export class DashboardsModule {}
