import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  formatXLabel,
  generatingLegend,
  generatingLegend_3,
  renderTooltipLabel,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import { combineLatest, distinctUntilChanged, Subject, takeUntil, map, Observable } from 'rxjs';

@Component({
  selector: 'caRecallRate-chart',
  templateUrl: './caRecallRate.component.html',
  styleUrls: ['./caRecallRate.component.scss'],
})
export class CaRecallRateComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  chartNames: CA_RECALL_RATE_CHART_NAME[] = ['Recall Prebook Rate', 'Reappointment Rate'];
  get showTableView$() {
    return this.isTableIconVisible$.pipe(map(v => this.showTableInfo && v));
  }

  get showMaxBarsAlert$() {
    return combineLatest([this.showTableView$, this.isTableIconVisible$]).pipe(
      map(([v, v1]) => {
        return !v && this.tableData?.length > this.labels?.length && v1;
      }),
    );
  }

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get trendingIcon() {
    if (this.total >= this.prev) {
      return 'trending_up';
    } else return 'trending_down';
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get showGoals$() {
    return combineLatest([
      this.layoutFacade.dateRange$,
      this.layoutFacade.isFullSingleMonthDateRange$,
    ]).pipe(
      map(([v, isFullSingle]) => {
        return (v.duration !== 'custom' && v.enableGoal) || isFullSingle;
      }),
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get getTrendTip$() {
    return combineLatest([this.durationTrendLabel$]).pipe(
      map(([durTrendLabel]) => durTrendLabel + ': ' + this.decimalPipe.transform(this.prev) + '%'),
    );
  }

  get isTableIconVisible$() {
    return combineLatest([this.isDentistMode$, this.isCompare$, this.hasData$, this.isTrend$]).pipe(
      map(
        ([isDentistMode, isCompare, hasData, isTrend]) =>
          (!(isDentistMode && isTrend) || isCompare) &&
          this.tableData.length > 0 &&
          hasData &&
          !this.isComingSoon,
      ),
    );
  }

  get isTrendIconVisible$() {
    return this.caFacade.isTrendIconVisible$;
  }

  datasets: any = [{ data: [] }];
  labels = [];
  prev = 0;

  total = 0;

  average = 0;

  goal = 0;
  gaugeValue = 0;
  gaugeLabel = '';

  showTableInfo = false;
  tableData = [];

  public chartOptions: ChartOptions;

  public barChartOptions: ChartOptions<'bar'> = {
    hover: { mode: null },
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          autoSkip: false,
          callback: function (tickValue: string | number, index, ticks) {
            return formatXLabel(this.getLabelForValue(index));
          },
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (label: number, index, ticks) => {
            // when the floored value is the same as the value we have a whole number
            if (typeof label === 'number') {
              return `${this.decimalPipe.transform(label)}%`;
            } else {
              return `$${label}`;
            }
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: generatingLegend(),
      tooltip: {
        mode: 'x',
        bodyFont: {
          family: 'Gilroy-Regular',
        },
        cornerRadius: 0,
        callbacks: {
          label: tooltipItem => tooltipItem.label + ': ' + tooltipItem.formattedValue + '%',
          // remove title
          title: function () {
            return '';
          },
        },
      },
    },
  };

  public barChartOptionsPercentTrend: ChartOptions = {
    hover: { mode: null },
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
        stacked: true,
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label + ' %';
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          // use label callback to return the desired label
          label: tooltipItem => renderTooltipLabel(tooltipItem, '%'),
          // remove title
          title: function (tooltipItem) {
            return '';
          },
        },
      },
      legend: generatingLegend_3(),
    },
    elements: {
      line: {
        fill: false,
      },
    },
  };

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      }),
    );
  }

  get isLoading$() {
    return this.caFacade.isLoadingRecallRateAll$;
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  get chartName$() {
    return this.caFacade.recallRateChartName$;
  }

  get hasData$() {
    return combineLatest([this.isDentistMode$, this.isTrend$, this.isCompare$]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !(isTrend || isCompare)) {
          return this.gaugeValue !== 0;
        } else {
          return (
            this.datasets?.length > 0 &&
            this.datasets?.some(
              it => it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v)),
            )
          );
        }
      }),
    );
  }

  get avgMode$() {
    return this.layoutFacade.average$;
  }

  get isEnableFooter$() {
    return this.caFacade.isHideFooterSection$.pipe(map(v => !v));
  }

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  get noDataAlertMessage$() {
    return combineLatest([this.caFacade.recallRateChartName$]).pipe(
      map(([visibility]) => {
        switch (visibility) {
          case 'Recall Prebook Rate':
            return 'You have no recall prebookings in the selected period';

          case 'Reappointment Rate':
            return 'You have no reappointments in the selected period';
        }
      }),
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(v => v && v !== 'off'));
  }

  get isCompare$() {
    return this.layoutFacade.compare$;
  }

  get isGaugeChartVisible$() {
    return combineLatest([this.isDentistMode$, this.isTrend$, this.isCompare$]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => isDentistMode && !isTrend && !isCompare),
    );
  }
  get goalCount$(): Observable<number> {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.avgMode$,
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caRecallRateChartData$,
      this.caFacade.caRecallRateTrendChartData$,
      this.goalCount$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe(([avgMode, isDentistMode, isTrend, data, trendData, goalCount]) => {
        if (!isDentistMode || !isTrend) {
          this.datasets = data.datasets ?? [];
          this.labels = data.labels ?? [];
        } else {
          this.datasets = trendData.datasets ?? [];
          this.labels = trendData.labels ?? [];
        }

        this.total = data.total;
        this.prev = data.prev;
        this.average = data.total;
        this.goal = data.goal;
        this.tableData = data.tableData ?? [];
        this.gaugeLabel = data.gaugeLabel;
        this.gaugeValue = data.gaugeValue;

        this.setChartOptions(isDentistMode, isTrend, avgMode, goalCount);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName: CA_RECALL_RATE_CHART_NAME) {
    this.caFacade.setRecallRateChartName(chartName);
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  getAvgPluginOptions(avgVal: number): _DeepPartialObject<AnnotationPluginOptions> {
    return {
      annotations: [
        {
          drawTime: 'afterDraw',
          type: 'line',
          scaleID: 'y-axis-0',
          yMax: avgVal,
          yMin: avgVal,
          borderColor: '#0e3459',
          borderWidth: 2,
          borderDash: [2, 2],
          borderDashOffset: 0,
        },
      ],
    };
  }

  getGoalPluginOptions(goalVal): _DeepPartialObject<AnnotationPluginOptions> {
    return {
      annotations: [
        {
          drawTime: 'afterDraw',
          type: 'line',
          scaleID: 'y-axis-0',
          yMax: goalVal,
          yMin: goalVal,
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [2, 2],
          borderDashOffset: 0,
        },
      ],
    };
  }

  private setChartOptions(
    isDentistMode: boolean,
    isTrend: boolean,
    avgMode: string,
    goalCount: number,
  ): void {
    if (!isDentistMode || !isTrend) {
      let options: ChartOptions = { ...this.barChartOptions };
      if (avgMode === 'average') {
        options.plugins.annotation = this.getAvgPluginOptions(this.average);
      } else if (avgMode === 'goal') {
        const value = this.goal * goalCount;
        options.plugins.annotation = this.getGoalPluginOptions(value);
      } else {
        options.plugins.annotation = {};
      }

      this.chartOptions = options;
    } else {
      this.chartOptions = this.barChartOptionsPercentTrend;
    }
  }
}
