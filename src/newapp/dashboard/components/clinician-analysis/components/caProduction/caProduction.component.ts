import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, TooltipItem } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'caProduction-chart',
  templateUrl: './caProduction.component.html',
  styleUrls: ['./caProduction.component.scss'],
})
export class CaProductionComponent implements OnInit, OnDestroy {
  @Input() toolTip: string = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  prodChartNames: CA_PROD_CHART_NAME[] = [
    'Production',
    'Collection',
    'Collection-Exp',
  ];

  datasets: any = [{ data: [] }];
  labels = [];

  // get chartOptions$() {
  //   return combineLatest([
  //     this.financeFacade.profitTrendChartName$,
  //     this.clinicFacade.currentClinicId$,
  //   ]).pipe(
  //     takeUntil(this.destroy$),
  //     map(([t, clinicId]) => {
  //       const isMultiClinic = typeof clinicId == 'string';

  //       switch (t) {
  //         case 'Production':
  //           return isMultiClinic
  //             ? this.stackedChartOptionsDiscount
  //             : this.labelBarOptionsSingleValue;
  //         case 'Collection':
  //           return isMultiClinic
  //             ? this.stackedChartOptionsDiscount
  //             : this.labelBarOptionsSingleValue;
  //         case 'Net Profit':
  //           return isMultiClinic
  //             ? this.netProfitTrendMultiChartOptions
  //             : this.labelBarOptionsSingleValue;
  //         case 'Net Profit %':
  //           return this.labelBarOptionsSingleValue1;
  //       }
  //       return {};
  //     })
  //   );
  // }

  // get legend$() {
  //   return combineLatest([
  //     this.clinicFacade.currentClinicId$,
  //     this.financeFacade.profitTrendChartName$,
  //   ]).pipe(
  //     map(([v, chartName]) => {
  //       if (['Net Profit %', 'Net Profit'].indexOf(chartName) >= 0)
  //         return false;
  //       return typeof v === 'string' ? true : false;
  //     })
  //   );
  // }

  // get isLoading$() {
  //   return combineLatest([
  //     this.financeFacade.profitTrendChartName$,
  //     this.financeFacade.isLoadingTotalProductionTrend$,
  //     this.financeFacade.isLoadingCollectionTrend$,
  //     this.financeFacade.isLoadingNetProfitTrend$,
  //     this.financeFacade.isLoadingNetProfitPercentageTrend$,
  //   ]).pipe(
  //     takeUntil(this.destroy$),
  //     map(
  //       ([
  //         t,
  //         isLoadingProdTrend,
  //         isLoadingColTrend,
  //         isNetProfitTrend,
  //         isNetProfitPercentTrend,
  //       ]) => {
  //         switch (t) {
  //           case 'Production':
  //             return isLoadingProdTrend;
  //           case 'Collection':
  //             return isLoadingColTrend;
  //           case 'Net Profit':
  //             return isNetProfitTrend;
  //           case 'Net Profit %':
  //             return isNetProfitPercentTrend;
  //         }
  //         return false;
  //       }
  //     )
  //   );
  // }

  get chartName$() {
    return this.caFacade.prodChartName$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private dashboardFacade: DashboardFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {
    // combineLatest([
    //   this.caFacade.prodTrendChartData$,
    //   this.clinicFacade.currentClinicId$,
    //   this.layoutFacade.trend$,
    //   this.caFacade.collectionTrendChartData$,
    //   this.caFacade.profitTrendChartName$,
    //   this.caFacade.netProfitTrendChartData$,
    //   this.caFacade.netProfitPercentTrendChartData$,
    // ])
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     ([
    //       prodChartData,
    //       clinicId,
    //       trend,
    //       collectionTrendChartData,
    //       chartName,
    //       netProfitTrendChartData,
    //       netProfitPercentChartData,
    //     ]) => {
    //       if (!prodChartData) {
    //         return;
    //       }
    //       let chartDataset = [],
    //         chartLabels = [];
    //       switch (chartName) {
    //         case 'Production':
    //           if (typeof clinicId === 'string') {
    //             chartDataset = (<any>prodChartData).datasets;
    //             chartLabels = (<any>prodChartData).labels;
    //           } else {
    //             chartDataset = [{ data: [] }];
    //             if (Array.isArray(prodChartData)) {
    //               (<any>prodChartData).forEach(
    //                 (data: { label: string; value: number } & any, index) => {
    //                   chartDataset[0].data.push(data.value);
    //                   chartLabels.push(data.label);
    //                 }
    //               );
    //             }
    //           }
    //           break;
    //         case 'Collection':
    //           if (typeof clinicId === 'string') {
    //             chartDataset = (<any>collectionTrendChartData).datasets;
    //             chartLabels = (<any>collectionTrendChartData).labels;
    //           } else {
    //             chartDataset = [{ data: [] }];
    //             (<any>collectionTrendChartData).forEach(
    //               (data: { label: string; value: number } & any, index) => {
    //                 chartDataset[0].data.push(data.value);
    //                 chartLabels.push(data.label);
    //               }
    //             );
    //           }
    //           break;
    //         case 'Net Profit':
    //           if (typeof clinicId === 'string') {
    //             chartDataset = (<any>netProfitTrendChartData).datasets;
    //             chartLabels = (<any>netProfitTrendChartData).labels;
    //           } else {
    //             chartDataset = [{ data: [] }];
    //             (<any>netProfitTrendChartData).forEach(
    //               (data: { label: string; value: number } & any, index) => {
    //                 chartDataset[0].data.push(data.value);
    //                 chartLabels.push(data.label);
    //               }
    //             );
    //           }
    //           break;
    //         case 'Net Profit %':
    //           chartDataset = [{ data: [] }];
    //           netProfitPercentChartData.forEach(
    //             (data: { label: string; value: number } & any, index) => {
    //               chartDataset[0].data.push(data.value);
    //               chartLabels.push(data.label);
    //             }
    //           );
    //       }
    //       this.datasets = chartDataset;
    //       this.labels = chartLabels;
    //     }
    //   );
  }

  // get chartType$() {
  //   return combineLatest([
  //     this.financeFacade.profitTrendChartName$,
  //     this.clinicFacade.currentClinicId$,
  //   ]).pipe(
  //     takeUntil(this.destroy$),
  //     map(([t, clinicId]) => {
  //       const isMultiClinic = typeof clinicId == 'string';
  //       switch (t) {
  //         case 'Production':
  //           return isMultiClinic ? 'bar' : 'line';
  //         case 'Collection':
  //           return isMultiClinic ? 'bar' : 'line';
  //         case 'Net Profit':
  //           return 'line';
  //         case 'Net Profit %':
  //           return 'line';
  //       }
  //       return 'line';
  //     })
  //   );
  // }

  // get isDisconnectedPlatform$() {
  //   return combineLatest([
  //     this.dashboardFacade.connectedWith$,
  //     this.financeFacade.profitTrendChartName$,
  //     // this.clinicFacade.currentClinicId$,
  //   ]).pipe(
  //     map(([v, chartName]) => {
  //       const isDisconnected = !(v && v != 'none');
  //       // const isMultiClinic = typeof clinicId == "string";

  //       return isDisconnected && chartName !== 'Collection';
  //     })
  //   );
  // }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    this.caFacade.setProdChartName(chartName);
  }
}
