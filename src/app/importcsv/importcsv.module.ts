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

import { ImportcsvRoutes } from './importcsv.routing';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImportcsvService } from './importcsv.service';
import { ImportcsvComponent } from './importcsv.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ImportcsvRoutes),
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartistModule,
    ChartsModule,
    NgxChartsModule,
    NgxDatatableModule,
  ],
  providers: [
    ImportcsvService, DatePipe
  ],
  declarations: [ ImportcsvComponent ]
})
export class ImportcsvModule { }