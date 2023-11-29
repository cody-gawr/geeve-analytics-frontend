import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';

import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import {
  Observable,
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';

@Component({
  selector: 'cp-clinician-referrals-chart',
  templateUrl: './clinician-referrals.component.html',
  styleUrls: ['./clinician-referrals.component.scss'],
})
export class CpClinicianReferralsComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];
  bgColors = [];

  referralsVal = 0;
  referralsPrev = 0;
  referralsVal2 = 0;
  referralsPrev2 = 0;
  referralsVal3 = 0;
  referralsPrev3 = 0;
  maxValue = 0;

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get isLoading$() {
    return combineLatest([
      this.cpFacade.isLoadingCpReferrals$,
      this.cpFacade.isLoadingCpReferralsTrend$,
    ]).pipe(
      map(
        ([isLoadingCpReferrals, isLoadingCpReferralsTrend]) =>
          isLoadingCpReferrals || isLoadingCpReferralsTrend
      )
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get legend$() {
    return combineLatest([this.isTrend$]).pipe(map(([isTrend]) => !isTrend));
  }

  get hasData$(): Observable<boolean> {
    return combineLatest([this.isTrend$]).pipe(
      map(([isTrend]) => (isTrend ? this.labels.length > 0 : this.maxValue > 0))
    );
  }

  get noDataAlertMessage$() {
    return combineLatest([this.cpFacade.cpReferralsVisibility$]).pipe(
      map(([visibility]) => {
        switch (visibility) {
          case 'internal':
            return 'You have no internal referrals in the selected period';
          case 'external':
            return 'You have no external referrals in the selected period';
          case 'combined':
            return 'You have no referrals in the selected period';
          default:
            return '';
        }
      })
    );
  }

  get visibility$() {
    return this.cpFacade.cpReferralsVisibility$;
  }

  public get isLargeOrSmall$() {
    return this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.Small])
      .pipe(map(result => result.matches));
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private cpFacade: ClinicianProcedureFacade,
    private breakpointObserver: BreakpointObserver,
    private dentistFacade: DentistFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.cpFacade.cpReferralsChartData$,
      this.cpFacade.cpReferralsTrendChartData$,
      this.isTrend$,
      this.dentistFacade.isDentistMode$,
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe(([chartData, trendChartData, isTrend, dentistMode]) => {
        if (dentistMode && isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.referralsVal = chartData.referralsVal;
          this.referralsPrev = chartData.referralsPrev;
          this.referralsVal2 = chartData.referralsVal2;
          this.referralsPrev2 = chartData.referralsPrev2;
          this.referralsVal3 = chartData.referralsVal3;
          this.referralsPrev3 = chartData.referralsPrev3;
          this.maxValue = chartData.maxVal;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions$() {
    return combineLatest([
      this.isTrend$,
      this.clinicFacade.currentClinics$,
    ]).pipe(
      map(([isTrend, clinics]) => {
        if (isTrend) {
          return this.stackedChartOptions;
        } else {
          return this.pieChartOptions;
        }
      })
    );
  }

  setVisibility(val: 'combined' | 'internal' | 'external') {
    this.cpFacade.setCpReferralsVisibility(val);
  }

  get chartType$() {
    return combineLatest([
      //this.isMultipleClinic$,
      this.isTrend$,
    ]).pipe(
      map(([isTrend]) => {
        return isTrend ? 'bar' : 'doughnut';
      })
    );
  }

  private legendLabelOptions: _DeepPartialObject<LegendOptions<any>> = {
    labels: {
      usePointStyle: true,
      padding: 20,
    },
    onClick: function (e) {
      e.native.stopPropagation();
    },
  };

  public stackedChartOptions: ChartOptions = {
    hover: {
      mode: null,
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
              return label;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        ...this.legendLabelOptions,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !!ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0 && tooltipItems.dataset.label != '') {
              if (tooltipItems.dataset.label.indexOf('DentistMode-') >= 0) {
                return tooltipItems.label + ': ' + tooltipItems.formattedValue;
              } else {
                return (
                  tooltipItems.dataset.label +
                  ': ' +
                  tooltipItems.formattedValue
                );
              }
            }
            return '';
          },
          title: function (tooltip) {
            if (tooltip[0].dataset.label?.indexOf('DentistMode-') >= 0) {
              var dentist = tooltip[0].dataset.label.split('Mode-');
              return dentist[1];
            } else {
              return tooltip[0].label;
            }
          },
        },
      },
    },
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.formattedValue}`;
          },
          title: function () {
            return '';
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        ...this.legendLabelOptions,
      },
    },
  };
}
