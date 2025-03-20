import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { MkNewPatientsByReferral } from '@/newapp/models/dashboard/marketing';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, Chart } from 'chart.js';
import _ from 'lodash';
import camelCase from 'camelcase';
import { Subject, takeUntil, combineLatest, map, take } from 'rxjs';
import { externalTooltipHandler } from '@/newapp/shared/utils';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';

@Component({
  selector: 'new-patient-by-referral-chart',
  templateUrl: './new-patient-by-referral.component.html',
  styleUrls: ['./new-patient-by-referral.component.scss'],
})
export class MarketingNewPatientByReferralComponent
  implements OnInit, OnDestroy
{
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [];
  labels = [];
  tableData = [];
  newPatientsByReferralVal = 0;
  isChartClicked = 0;
  firstActiveLabel = '';
  newPatientsListData = [];
  showTableInfo = false;
  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  get isTableIconVisible$() {
    return combineLatest([
      this.isTrend$,
      this.isMultipleClinic$
    ]).pipe(
      map(
      ([isTrend, isMultiClinicsMode]) => 
        !isTrend && !isMultiClinicsMode && this.hasData && (this.tableData?.length > 0)
    ));
  }

  get showMaxBarsAlert$() {
      return combineLatest([
        this.showTableView$,
        this.isTableIconVisible$,
      ]).pipe(
        map(([v, v1]) => {
          return !v && (this.tableData?.length > this.labels?.length) && v1;
        })
      ) 
  }

  get showTableView$() {
      return this.isTableIconVisible$.pipe(map(
        v => this.showTableInfo && v
      ))
  }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.marketingFacade.isLoadingNewPatientsByReferral$,
      this.marketingFacade.isLoadingNewPatientsByReferralTrend$,
    ]).pipe(map(([isTrend, v, v1]) => (isTrend ? v1 : v)));
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get chartType$() {
    return combineLatest([
      this.clinicFacade.currentClinicId$,
      this.isTrend$,
    ]).pipe(
      map(([v, trendMode]) => {
        if (trendMode) {
          return 'bar';
        } else if (typeof v === 'string') {
          return 'bar';
        } else {
          return 'doughnut';
        }
      })
    );
  }

  get chartOptions$() {
    return combineLatest([this.isMultipleClinic$, this.isTrend$]).pipe(
      map(([isMultClinics, isTrend]) => {
        if (isTrend) {
          return this.stackedChartOptionsRef;
        } else if (isMultClinics) {
          return this.stackedChartOptionsRef;
        } else {
          return this.noNewPatientsByReferralChartOptions;
        }
      })
    );
  }

  get hasData() {
    return this.labels.length > 0;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get isActivePatients$() {
    return this.marketingFacade.isActivePatients$;
  }

  get isExactOrCore$() {
    return combineLatest([
      this.clinicFacade.isEachClinicExact$,
      this.clinicFacade.isEachClinicCore$,
    ]).pipe(
      map(values => {
        return values[0] || values[1];
      })
    );
  }

  get legend$() {
    return combineLatest([this.isMultipleClinic$, this.isTrend$]).pipe(
      map(([isMultiClinics, isTrend]) => !isMultiClinics && !isTrend && this.labels.length <= 12)
    );
  }

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private authFacade: AuthFacade
  ) {}

  loadData() {
    combineLatest([
      this.marketingFacade.newPatientsByReferralChartData$,
      this.isTrend$,
      this.marketingFacade.newPatientsByReferralTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, isTrend, trendChartData]) => {
        this.isChartClicked = 0;
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          console.log('chartData', chartData)
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.tableData = chartData.tableData;
          this.newPatientsByReferralVal = chartData.newPatientsByReferralVal;
        }
      });
  }

  get pmsName$() {
    return this.clinicFacade.currentClinics$.pipe(map(clinics => clinics?.length > 0 && clinics[0].pms));
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  

  public chartClicked(event: any) {
    if (this.isChartClicked < 2 && event.active.length > 0) {
      // pms != exact or core
      const clickedElementIndex = event.active[0].index;
      const activeLabel = camelCase(
        <string>(<Chart>event.event.chart).data.labels[clickedElementIndex]
      );
      this.newPatientsListData = [];
      combineLatest([
        this.isMultipleClinic$,
        this.marketingFacade.newPatientsByReferralData$,
        this.pmsName$,
      ])
        .pipe(take(1))
        .subscribe(([isMulti, result, pmsName]) => {
          const apiResData = <MkNewPatientsByReferral>result.data;
          if (result != null && !isMulti) {
            if(pmsName === 'praktika' || this.isChartClicked == 1){
              this.isChartClicked = 2;
              if(pmsName !== 'praktika'){
                _.chain(apiResData.patientsRefname[this.firstActiveLabel])
                .filter(item => camelCase(item.referralName) === activeLabel)
                .value()
                .forEach(item => {
                  this.newPatientsListData.push(item.patientName);
                });
              }else{
                _.chain(apiResData.patientsRefname[activeLabel])
                .value()
                .forEach(item => {
                  this.newPatientsListData.push(item.patientName);
                });
              }

            }else{
              let chartData = [],
              chartLabels = [];
              this.isChartClicked = 1;
              if (apiResData.patientsRefname[activeLabel].length > 0) {
                this.firstActiveLabel = activeLabel;
                _.chain(apiResData.patientsRefname[activeLabel])
                  .groupBy('referralName')
                  .map((items, referralName) => {
                    return [referralName, items?.length || 0];
                  }).sortBy(a => -a[1]).value().forEach(item => {
                    chartLabels.push(item[0]);
                    chartData.push(item[1]);
                  });
              }
              
              this.datasets = [{ data: chartData }];
              this.labels = chartLabels;
            }
            
          }
        });
    }
  }

  public noNewPatientsByReferralChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: args => {
          externalTooltipHandler(args, 'pointer');
        },
        callbacks: {
          label: tooltipItem => {
            return (
              tooltipItem.label +
              ': ' +
              this.decimalPipe.transform(
                <number>tooltipItem.dataset.data[tooltipItem.dataIndex]
              )
            );
          },
          title: function () {
            return '';
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick: function (e) {
          e.native.stopPropagation();
        },
      },
    },
  };

  public stackedChartOptionsRef: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return label; // `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        itemSort: (itemA, itemB): number => {
          return itemB.parsed.y - itemA.parsed.y;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0) {
              return `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue}`;
            } else {
              return '';
            }
          },
          title: tooltipItems => {
            const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: ${this.decimalPipe.transform(
              sumV
            )}`;
          },
        },
      },
    },
  };
}
