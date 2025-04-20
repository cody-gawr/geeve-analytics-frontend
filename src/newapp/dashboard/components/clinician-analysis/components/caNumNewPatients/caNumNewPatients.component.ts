import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { formatXLabel, generatingLegend_3, renderTooltipLabel } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart, ChartOptions, Plugin } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map, distinctUntilChanged, Observable } from 'rxjs';

@Component({
  selector: 'caNumNewPatients-chart',
  templateUrl: './caNumNewPatients.component.html',
  styleUrls: ['./caNumNewPatients.component.scss'],
})
export class CaNumNewPatientsComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

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
      map(([durTrendLabel]) => {
        return durTrendLabel + ': ' + this.decimalPipe.transform(this.prev);
      }),
    );
  }

  get isCompare$() {
    return this.layoutFacade.compare$;
  }

  get isGaugeChartVisible$() {
    return combineLatest([this.isDentistMode$, this.isTrend$, this.isCompare$]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => isDentistMode && !isTrend && !isCompare),
    );
  }

  get isTrendIconVisible$() {
    return this.caFacade.isTrendIconVisible$;
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

  showTableInfo = false;
  tableData = [];

  newpColors = [];

  legendSettings = {
    visible: false,
    position: top,
    labels: {
      usePointStyle: true,
    },
  };

  get goalCount$(): Observable<number> {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  get isLoading$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.isLoadingCaNumNewPatients$,
      this.caFacade.isLoadingCaNumNewPatientsTrend$,
    ]).pipe(
      map(([isDentistMode, isTrend, isLoadingData, isLoadingDataTrend]) => {
        if (!isDentistMode || !isTrend) {
          return isLoadingData;
        } else {
          return isLoadingDataTrend;
        }
      }),
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isDentistMode$]).pipe(
      map(([isTrend, isDentistMode]) => {
        if (!isDentistMode || !isTrend) return this.doughnutChartOptions;
        else return this.barChartOptionsTrend;
      }),
    );
  }

  get chartPlugins$() {
    return combineLatest([this.isTrend$, this.isDentistMode$]).pipe(
      map(([isTrend, isDentistMode]) => {
        if (!isDentistMode || !isTrend) return this.beforeDrawChart(this.total);
        else return null;
      }),
    );
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

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(v => v && v !== 'off'));
  }

  get chartType$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) => {
        if (!isDentistMode || !isTrend) {
          return 'doughnut';
        } else {
          return 'bar';
        }
      }),
    );
  }

  get chartLegend$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) => {
        if (!isDentistMode || !isTrend) {
          return this.legendSettings;
        } else {
          return false;
        }
      }),
    );
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade,
    private clinicFacade: ClinicFacade,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caNumNewPatientsChartData$,
      this.caFacade.caNumNewPatientsTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe(([isDentistMode, isTrend, data, trendData]) => {
        if (!isDentistMode || !isTrend) {
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

  switchChartName(chartName) {
    switch (chartName) {
      case 'Production':
        this.caFacade.setProdSelectTab('production_all');
        break;
      case 'Collection':
        this.caFacade.setColSelectTab('collection_all');
        break;
      case 'Collection-Exp':
        this.caFacade.setColExpSelectTab('collection_exp_all');
        break;
    }
    this.caFacade.setProdChartName(chartName);
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
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
          label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.formattedValue}`,
          title: function () {
            return '';
          },
        },
      },
    },
  };

  public barChartOptionsTrend: ChartOptions<'bar'> = {
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
          label: tooltipItem => renderTooltipLabel(tooltipItem),
          // remove title
          title: function (tooltipItem) {
            return '';
          },
        },
      },
      legend: generatingLegend_3(),
    },
  };

  beforeDrawChart(count: number, isCurrency?: boolean) {
    const array: Plugin[] = [
      {
        id: 'plugin-123',
        beforeDraw: (chart: Chart) => {
          const ctx = chart.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = (count.toString().length > 4 ? 24 : 37) + 'px Gilroy-Bold';
          ctx.fillStyle = '#454649';
          // Draw text in center
          let perThousands = count
            .toFixed(0)
            .split(/(?=(?:...)*$)/)
            .join(','); //decimal numbers fixed to zero number of digits after decimal point

          if (isCurrency) {
            ctx.fillText('$ ' + perThousands, centerX, centerY);
          } else {
            ctx.fillText(perThousands, centerX, centerY);
          }
        },
      },
    ];

    return array;
  }
}
