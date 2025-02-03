import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map, Observable } from 'rxjs';
import { MkSelectAccountsModalComponent } from '../select-accounts-modal/select-accounts-modal.component';
import {
  externalTooltipHandler,
  generatingLegend_4,
} from '@/newapp/shared/utils';

@Component({
  selector: 'new-patients-acq-chart',
  templateUrl: './new-patients-acq.component.html',
  styleUrls: ['./new-patients-acq.component.scss'],
})
export class MarketingNewPatientsAcqComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    return this.newPatientsAcqVal >= this.newPatientsAcqPrev
      ? 'trending_up'
      : 'trending_down';
  }

  get maxNewPatientsAcqGoal() {
    return this.newPatientsAcqVal > this.newPatientsAcqGoal
      ? this.newPatientsAcqVal
      : this.newPatientsAcqGoal;
  }

  get isActivePatients$() {
    return this.marketingFacade.isActivePatients$;
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) =>
        isTrend || isMulti
          ? this.labels.length > 0
          : this.newPatientsAcqVal != 0
      )
    );
  }

  newPatientsAcqVal = 0;
  newPatientsAcqPrev = 0;
  newPatientsAcqGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get goalCount$(): Observable<number> {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.marketingFacade.isLoadingNewPatientsAcq$,
      this.marketingFacade.isLoadingNewPatientsAcqTrend$,
    ]).pipe(
      map(([isTrend, isLoading, isTrendLoading]) => {
        return isTrend ? isTrendLoading : isLoading;
      })
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get isConnectedWith$() {
    return this.clinicFacade.connectedWith$.pipe(
      map(v => {
        return v === 'myob' || v === 'xero';
      })
    );
  }

  get isFullMonthsDateRange$() {
    return this.layoutFacade.isFullMonthsDateRange$;
  }

  get showGoal$() {
    return combineLatest([
      this.layoutFacade.dateRange$,
      this.layoutFacade.isFullSingleMonthDateRange$,
    ]).pipe(
      map(([v, isFullSingle]) => {
        return (v.duration !== 'custom' && v.enableGoal) || isFullSingle;
      })
    );
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private dashboardFacade: DashboardFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isTrend$,
      this.marketingFacade.newPatientsAcqChartData$,
      this.marketingFacade.newPatientsAcqTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.newPatientsAcqVal = chartData.newPatientAcqVal;
          this.newPatientsAcqPrev = chartData.newPatientAcqPrev;
          this.newPatientsAcqGoal = chartData.newPatientAcqGoal;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  openAccountsDialog(): void {
    this.dialog.open(MkSelectAccountsModalComponent);
  }

  get chartOptions$() {
    return this.isTrend$.pipe(
      map(isTrend => {
        return isTrend ? this.barChartOptions : this.stackedChartOptions;
      })
    );
  }

  public stackedChartOptions: ChartOptions<'bar'> = {
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
        beginAtZero: true,
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: tooltipItems => {
            return (
              tooltipItems.label +
              ': $' +
              this.decimalPipe.transform(tooltipItems.parsed.y)
            );
          },
          title: function () {
            return '';
          },
        },
      },
    },
  };
  public barChartOptions: ChartOptions = {
    // showLines: false,
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: true },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        suggestedMin: 0,
        ticks: {
          callback: (label: string) => {
            return '$' + this.decimalPipe.transform(label);
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        mode: 'x',
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: tooltipItems => {
            return tooltipItems.label + ': $' + tooltipItems.formattedValue;
          },
          title: function () {
            return '';
          },
        },
      },
      legend: generatingLegend_4(),
    },
  };

  barChartColors = [
    { backgroundColor: '#39acac' },
    { backgroundColor: '#48daba' },
  ];

  lineChartColors = [
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
  ];
}
