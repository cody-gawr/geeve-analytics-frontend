import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration)
    );
  }

  get trendingIcon$() {
    return combineLatest([this.chartName$]).pipe(
      takeUntil(this.destroy$),
      map(([chartName]) => {
        switch (chartName) {
          case 'Production':
            if (this.totalVal.production >= this.totalPrev.production) {
              return 'trending_up';
            } else return 'trending_down';
          case 'Collection':
            if (this.totalVal.collection >= this.totalPrev.collection) {
              return 'trending_up';
            } else return 'trending_down';
          case 'Collection-Exp':
            if (this.totalVal.collectionExp >= this.totalPrev.collectionExp) {
              return 'trending_up';
            } else return 'trending_down';
        }
      })
    );
  }

  prodSelectShow = new FormControl('production_all');
  colSelectShow = new FormControl('collection_all');
  colExpSelectShow = new FormControl('collection_exp_all');

  get durationLabel$() {
    return this.layoutFacade.durationLabel$.pipe(
      takeUntil(this.destroy$),
      map(val => val)
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$.pipe(
      takeUntil(this.destroy$),
      map(l => l)
    );
  }

  get getTrendTip$() {
    return combineLatest([this.durationTrendLabel$, this.chartName$]).pipe(
      takeUntil(this.destroy$),
      map(([durTrendLabel, chartName]) => {
        switch (chartName) {
          case 'Production':
            return (
              durTrendLabel +
              ': $' +
              this.decimalPipe.transform(this.totalPrev.production)
            );
          case 'Collection':
            return (
              durTrendLabel +
              ': $' +
              this.decimalPipe.transform(this.totalPrev.collection)
            );
          case 'Collection-Exp':
            return (
              durTrendLabel +
              ': $' +
              this.decimalPipe.transform(this.totalPrev.collectionExp)
            );
        }
      })
    );
  }

  datasets: any = [{ data: [] }];
  labels = [];
  totalPrev = {
    production: 0,
    collection: 0,
    collectionExp: 0,
  };

  totalVal = {
    production: 0,
    collection: 0,
    collectionExp: 0,
  };

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return combineLatest([
      this.caFacade.prodChartName$,
      this.caFacade.isLoadingCaProduction$,
      this.caFacade.isLoadingCaProductionDentist$,
      this.caFacade.isLoadingCaProductionOht$,
      this.caFacade.isLoadingCaCollection$,
      this.caFacade.isLoadingCaCollectionDentists$,
      this.caFacade.isLoadingCaCollectionOht$,
      this.caFacade.isLoadingCaCollectionExp$,
      this.caFacade.isLoadingCaCollectionExpDentists$,
      this.caFacade.isLoadingCaCollectionExpOht$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(
        ([
          prodChartName,
          isLoadingCaProduction,
          isLoadingCaProductionDentist,
          isLoadingCaProductionOht,
          isLoadingCaCollection,
          isLoadingCaCollectionDentists,
          isLoadingCaCollectionOht,
          isLoadingCaCollectionExp,
          isLoadingCaCollectionExpDentists,
          isLoadingCaCollectionExpOht,
        ]) => {
          switch (prodChartName) {
            case 'Production':
              switch (this.prodSelectShow.value) {
                case 'production_all':
                  return isLoadingCaProduction;
                case 'production_dentists':
                  return isLoadingCaProductionDentist;
                case 'production_oht':
                  return isLoadingCaProductionOht;
              }
              break;
            case 'Collection':
              switch (this.colSelectShow.value) {
                case 'collection_all':
                  return isLoadingCaCollection;
                case 'collection_dentists':
                  return isLoadingCaCollectionDentists;
                case 'collection_oht':
                  return isLoadingCaCollectionOht;
              }
              break;
            case 'Collection-Exp':
              switch (this.prodSelectShow.value) {
                case 'collection_exp_all':
                  return isLoadingCaCollectionExp;
                case 'collection_exp_dentists':
                  return isLoadingCaCollectionExpDentists;
                case 'collection_exp_oht':
                  return isLoadingCaCollectionExpOht;
              }
          }
          return false;
        }
      )
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(v => v.type)
    );
  }

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
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    switch (chartName) {
      case 'Production':
        this.prodSelectShow.setValue('production_all');
        break;
      case 'Collection':
        this.colSelectShow.setValue('collection_all');
        break;
      case 'Collection-Exp':
        this.colExpSelectShow.setValue('collection_exp_all');
        break;
    }
    this.caFacade.setProdChartName(chartName);
  }

  chartOptions$() {
    return combineLatest([this.caFacade.prodChartName$, this.userType$]).pipe(
      takeUntil(this.destroy$),
      map(([v, userType]) => {
        switch (v) {
          case 'Production':
            switch (this.prodSelectShow.value) {
              case 'production_all':
                // data: barChartData
                // labels: barChartLabels
                // option: barChartOptionsDP1
                // legend: isAllClinic
                // type: barChartType
                break;
              case 'production_dentists':
                // data: barChartDataDentists
                // labels: barChartDentistLabels
                // option: barChartOptionsDP1
                // legend: isAllClinic
                // type: barChartType
                break;
              case 'production_oht':
                // data: barChartDataOht
                // labels: barChartOhtLabels
                // option: barChartOptionsDP1
                // legend: isAllClinic
                // type: barChartType
                break;
            }
            break;
          case 'Collection':
            switch (this.prodSelectShow.value) {
              case 'collection_all':
                // data: collectionData
                // labels: collectionLabels
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP
                break;
              case 'collection_dentists':
                // data: collectionDentistsData
                // labels: collectionDentistsLabels
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP
                break;
              case 'collection_oht':
                // data: collectionOhtData
                // labels: collectionOhtLabels
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP
                break;
            }
            break;
          case 'Collection-Exp':
            switch (this.prodSelectShow.value) {
              case 'collection_exp_all':
                // data: collectionExpData
                // labels: collectionLabelsExp
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP6
                break;
              case 'collection_exp_dentists':
                // data: collectionExpDentistsData
                // labels: collectionLabelsDentistsExp
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP
                break;
              case 'collection_exp_oht':
                // data: collectionExpOhtData
                // labels: collectionLabelsOhtExp
                // legend: isAllClinic
                // type: barChartType
                // options: barChartOptionsDP
                break;
            }
            break;
        }
      })
    );
  }

  get hasData() {
    return this.datasets[0]?.data.length > 0;
  }

  get avgMode$() {
    return this.layoutFacade.average$.pipe(takeUntil(this.destroy$));
  }

  get noDataAlertMessage$() {
    return combineLatest([this.caFacade.prodChartName$]).pipe(
      takeUntil(this.destroy$),
      map(([visibility]) => {
        switch (visibility) {
          case 'Production':
            switch (this.prodSelectShow.value) {
              case 'production_all':
                return 'You have no production in the selected period';
              case 'production_dentists':
                return 'You have no Dentist production for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
              case 'production_oht':
                return 'You have no OHT production for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
            }
            break;
          case 'Collection':
            switch (this.colSelectShow.value) {
              case 'collection_all':
                return 'You have no Collection in the selected period';
              case 'collection_dentists':
                return 'You have no Dentist Collection for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
              case 'collection_oht':
                return 'You have no OHT Collection for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
            }
            break;
          case 'Collection-Exp':
            switch (this.colExpSelectShow.value) {
              case 'collection_exp_all':
                return 'You have no Collection in the selected period';
              case 'collection_exp_dentists':
                return 'You have no Dentist Collection for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
              case 'collection_exp_oht':
                return 'You have no OHT Collection for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
            }
        }
        return '';
      })
    );
  }
}
