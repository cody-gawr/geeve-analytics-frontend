import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  formatXLabel,
  generatingLegend_3,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
  Observable,
} from 'rxjs';

@Component({
  selector: 'caNumComplaints-chart',
  templateUrl: './caNumComplaints.component.html',
  styleUrls: ['./caNumComplaints.component.scss'],
})
export class CaNumComplaintsComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;

  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get showMaxBarsAlert() {
    return this.tableData?.length > this.labels?.length;
  }

  get isTableIconVisible$() {
    return combineLatest([
      this.isDentistMode$,
      this.isCompare$,
      this.hasData$,
    ]).pipe(
      map(
        ([isDentistMode, isCompare, hasData]) =>
          (!isDentistMode || isCompare) && this.tableData.length > 0 && hasData &&
          !this.isComingSoon
      )
    );
  }
  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get trendingIcon() {
    if (this.total < this.prev) {
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
      })
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get getTrendTip$() {
    return combineLatest([this.durationTrendLabel$]).pipe(
      map(
        ([durTrendLabel]) =>
          durTrendLabel + ': ' + this.decimalPipe.transform(this.prev)
      )
    );
  }

  get isTrendIconVisible$() {
    return this.caFacade.isTrendIconVisible$;
  }

  get isCompare$() {
    return this.layoutFacade.compare$;
  }

  get isGaugeChartVisible$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.isCompare$,
    ]).pipe(
      map(
        ([isDentistMode, isTrend, isCompare]) =>
          isDentistMode && !isTrend && !isCompare
      )
    );
  }

  datasets: any[] = [{ data: [] }];
  labels = [];
  public prev: number = 0;

  public total: number = 0;

  public average: number = 0;

  public goal: number = 0;
  public maxGoal: number = 0;
  public gaugeValue: number = 0;
  public gaugeLabel: string = '';

  get goalCount$(): Observable<number> {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  public showTableInfo: boolean = false;
  tableData = [];

  get legend$() {
    return combineLatest([this.isDentistMode$]).pipe(
      map(([v]) => {
        return !v;
      })
    );
  }

  get isLoading$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.isLoadingCaNumComplaints$,
      this.caFacade.isLoadingCaNumComplaintsTrend$,
    ]).pipe(
      map(([isDentistMode, isTrend, isLoadingData, isLoadingTrendData]) =>
        !isDentistMode || !isTrend ? isLoadingData : isLoadingTrendData
      )
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  get chartOptions$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) =>
        !isDentistMode || !isTrend
          ? this.doughnutChartOptions
          : this.barChartOptionsTrend
      )
    );
  }

  get hasData$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.isCompare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !(isTrend || isCompare)) {
          return this.gaugeValue !== 0;
        } else {
          return this.datasets?.some(
            it =>
              it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v))
          );
        }
      })
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

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(v => v && v !== 'off'));
  }

  get chartType$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.isCompare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) =>
        !isDentistMode || !isTrend || isCompare ? 'doughnut' : 'bar'
      )
    );
  }

  get chartLegend$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) => !(isDentistMode && isTrend))
    );
  }
  newpColors = [];

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caNumComplaintsChartData$,
      this.caFacade.caNumComplaintsTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(([isDentistMode, isTrend, data, trendData]) => {
        if (!(isDentistMode && isTrend)) {
          this.datasets = data.datasets ?? [];
          this.labels = data.labels ?? [];
        } else {
          this.datasets = trendData.datasets ?? [];
          this.labels = trendData.labels ?? [];
        }

        this.total = data.total;
        this.prev = data.prev;
        this.average = data.average;
        this.goal = data.goal;
        this.tableData = data.tableData ?? [];
        this.maxGoal = data.maxGoal;
        this.gaugeLabel = data.gaugeLabel;
        this.gaugeValue = data.gaugeValue;
        this.newpColors = data.chartColors ?? [];
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }
  getAvgPluginOptions(avgVal): _DeepPartialObject<AnnotationPluginOptions> {
    return {
      // drawTime: 'afterDatasetsDraw',
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

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    hover: { mode: null },
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutSine',
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 5,
          generateLabels: chart => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i) => ({
                text: <string>formatXLabel(label),
                fillStyle: this.newpColors[0].backgroundColor[i] ?? COLORS.even,
                strokeStyle: '#fff',
                index: i,
              }));
            }
            return [];
          },
        },
        onClick: function (e) {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipItem =>
            `${tooltipItem.label}: ${tooltipItem.formattedValue}`,
          title: function () {
            return '';
          },
        },
      },
    },
  };

  public barChartOptionsTrend: ChartOptions = {
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
        beginAtZero: true,
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
      // colors: { enabled: true },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem) {
            var Targetlable = '';
            const v = tooltipItem.parsed.y;
            let Tlable = tooltipItem.dataset.label;
            if (Tlable != '') {
              Tlable = Tlable + ': ';
              Targetlable = Tlable;
            }
            let ylable = tooltipItem.parsed._custom
              ? +(
                  tooltipItem.parsed._custom.max +
                  tooltipItem.parsed._custom.min
                ) / 2
              : v;
            var tlab = 0;
            if (typeof tooltipItem.chart.data.datasets[1] === 'undefined') {
            } else {
              const tval =
                tooltipItem.chart.data.datasets[1].data[tooltipItem.dataIndex];
              if (Array.isArray(tval)) {
                tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                if (tlab == 0) {
                  Tlable = '';
                }
              }
            }
            if (tlab == 0 && Targetlable == 'Target: ') {
              return '';
            } else {
              return Tlable + tooltipItem.label + ': ' + ylable;
            }
          },

          title: function (tooltipItem) {
            return '';
          },
        },
      },
      legend: generatingLegend_3(),
    },
  };
}
