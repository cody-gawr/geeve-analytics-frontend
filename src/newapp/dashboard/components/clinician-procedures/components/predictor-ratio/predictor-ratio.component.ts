import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cp-predictor-ratio-chart',
  templateUrl: './predictor-ratio.component.html',
  styleUrls: ['./predictor-ratio.component.scss'],
})
export class CpPredictorRatioComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];
  bgColors = [];

  predictorRatioValue = '';
  predictorRatioPrev = '';
  multifulRatio = '';

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get isLoading$() {
    return combineLatest([
      this.cpFacade.isLoadingCpPredictorRatio$,
      this.cpFacade.isLoadingCpPredictorRatioTrend$,
    ]).pipe(
      map(
        ([isLoadingCpPredictorRatio, isLoadingCpPredictorRatioTrend]) =>
          isLoadingCpPredictorRatio || isLoadingCpPredictorRatioTrend
      )
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinics$]).pipe(
      map(([clinics]) => clinics.length != 1)
    );
  }

  get hasData() {
    return this.labels.length > 0;
  }

  get noDataAlertMessage$() {
    return combineLatest([this.cpFacade.cpPredictorRatioVisibility$]).pipe(
      map(([visibility]) => {
        switch (visibility) {
          case 'indirect to large direct fillings':
            return 'You have no indirect or large direct fillings in the selected period';
          case 'rct to extraction':
            return 'You have no RCTs or extractions in the selected period';
          case 'rct conversion':
            return 'You have no RCTs in the selected period';
        }
      })
    );
  }

  get visibility$() {
    return this.cpFacade.cpPredictorRatioVisibility$;
  }

  public get isLargeOrSmall$() {
    return this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.Small])
      .pipe(map(result => result.matches));
  }

  setVisibility(
    val:
      | 'indirect to large direct fillings'
      | 'rct to extraction'
      | 'rct conversion'
  ) {
    this.cpFacade.setCpPredictorRatioVisibility(val);
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private cpFacade: ClinicianProcedureFacade,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.cpFacade.cpPredictorRatioChartData$,
      this.cpFacade.cpPredictorRatioTrendChartData$,
      this.isTrend$,
      this.isMultipleClinic$,
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe(([chartData, chartTrendData, isTrend, isMultiClinics]) => {
        if (isTrend) {
          this.datasets = chartTrendData.datasets;
          this.labels = chartTrendData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          if (isMultiClinics) {
            this.multifulRatio = chartData.multifulRatio;
          } else {
            this.predictorRatioValue = chartData.cpPredictorRatioAvr;
          }
          this.predictorRatioPrev = chartData.cpPredictorRatioPrev;
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
      map(([isTrend, clinics]) =>
        clinics.length === 1
          ? this.stackedChartOptions
          : this.stackedChartOptionsmulti
      )
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
  public stackedChartOptionsmulti: ChartOptions = {
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
      bar: {
        borderWidth: 10,
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
          return !ctx.tooltip;
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
            if (tooltip[0].dataset.label.indexOf('DentistMode-') >= 0) {
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
}
