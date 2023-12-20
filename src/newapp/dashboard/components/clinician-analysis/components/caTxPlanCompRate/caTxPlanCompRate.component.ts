import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'caTxPlanCompRate-chart',
  templateUrl: './caTxPlanCompRate.component.html',
  styleUrls: ['./caTxPlanCompRate.component.scss'],
})
export class CaTxPlanCompRateComponent implements OnInit, OnDestroy {
  @Input() toolTip: string = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTableIconVisible$() {
    return combineLatest([this.isDentistMode$, this.isCompare$]).pipe(
      map(
        ([isDentistMode, isCompare]) =>
          (!isDentistMode || isCompare) && this.tableData.length > 0
      )
    );
  }

  get isTrendIconVisible$() {
    return this.caFacade.isTrendIconVisible$;
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
    return this.layoutFacade.durationLabel$;
  }

  get showGoals$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.enableGoal));
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get getTrendTip$() {
    return combineLatest([this.durationTrendLabel$]).pipe(
      map(
        ([durTrendLabel]) =>
          durTrendLabel + ': ' + this.decimalPipe.transform(this.prev) + '%'
      )
    );
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

  public datasets: any[] = [{ data: [] }];
  public labels: any[] = [];
  public prev: number = 0;
  public total: number = 0;
  public average: number = 0;
  public goal: number = 0;
  public gaugeValue: number = 0;
  public gaugeLabel: string = '';

  public goalCount: number = 0;
  public showTableInfo: boolean = false;
  tableData = [];

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return combineLatest([
      this.caFacade.isLoadingCaTxPlanCompRate$,
      this.caFacade.isLoadingCaTxPlanCompRateTrend$,
    ]).pipe(
      map(
        ([isLoadingCaTxPlanCompRate, isLoadingCaTxPlanCompRateTrend]) =>
          isLoadingCaTxPlanCompRate || isLoadingCaTxPlanCompRateTrend
      )
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  public chartOptions: ChartOptions;

  get hasData$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.isCompare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !(isTrend || isCompare)) {
          return this.gaugeValue > 0;
        } else {
          return this.datasets[0]?.data.length > 0;
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

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.avgMode$,
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caTxPlanCompRateChartData$,
      this.caFacade.caTxPlanCompRateTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(([avgMode, isDentistMode, isTrend, data, trendData]) => {
        if (!(isDentistMode && isTrend)) {
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

        this.setChartOptions(isDentistMode, isTrend, avgMode);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  getAvgPluginOptions(
    avgVal: number
  ): _DeepPartialObject<AnnotationPluginOptions> {
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

  getGoalPluginOptions(
    goalVal: number
  ): _DeepPartialObject<AnnotationPluginOptions> {
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

  public legendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let bgColor = {};
        let labels = chart.data.labels.map((value: string, i) => {
          bgColor[value.split(' - ')[1]] =
            chart.data.datasets[0].backgroundColor[i];
          return value.split(' - ')[1];
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((label, index) => ({
          text: label,
          strokeStyle: bgColor[label],
          fillStyle: bgColor[label],
        }));
      },
    },
    onClick: (event, legendItem, legend) => {
      return;
    },
    // align : 'start',
  };

  public barChartOptionsPercent: ChartOptions = {
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
          callback: function (tickValue: string | number, index, ticks) {
            return formatXLabel(this.getLabelForValue(index));
          },
        },
      },
      y: {
        suggestedMin: 0,
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
    elements: {
      line: {
        fill: false,
      },
    },
    plugins: {
      legend: this.legendGenerator,
      tooltip: {
        mode: 'x',
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.formattedValue + '%';
          },
          // remove title
          title: function (tooltipItem) {
            return '';
          },
        },
      },
    },
  };

  public barChartOptionsPercentTrend: ChartOptions<'bar'> = {
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    hover: { mode: null },
    // curvature: 1,
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
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
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
              return Tlable + tooltipItem.label + ': ' + ylable + '%';
            }
          },
          // remove title
          title: function (tooltipItem) {
            return '';
          },
        },
      },
      legend: {
        position: 'top',
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          if (index == 0) {
            ci.getDatasetMeta(1).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          } else if (index == 1) {
            ci.getDatasetMeta(0).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          }
          ci.update();
        },
      },
    },
    elements: {
      line: {
        fill: false,
      },
    },
  };

  private setChartOptions(
    isDentistMode: boolean,
    isTrend: boolean,
    avgMode: string
  ): void {
    if (!isDentistMode || !isTrend) {
      let options: ChartOptions = { ...this.barChartOptionsPercent };
      if (avgMode === 'average') {
        options.plugins.annotation = this.getAvgPluginOptions(this.average);
      } else if (avgMode === 'goal') {
        const value = this.goal * this.goalCount;
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
