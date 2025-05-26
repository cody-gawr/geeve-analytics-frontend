import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel, generatingLegend_3 } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { combineLatest, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ca-total-discount',
  styles: [
    `
      .ca-discounts {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ],
  template: `
    <app-chart
      class="ca-discounts"
      [chartTitle]="chartTitle"
      [chartType]="chartType$ | async"
      [toolTip]="toolTip"
      [durationCurrLabel]="durationCurrLabel$ | async"
      [durationPrevLabel]="durationPrevLabel$ | async"
      [duration]="duration$ | async"
      [curr]="curr"
      [prev]="prev"
      [isLoading]="isLoading$ | async"
      [datasets]="datasets"
      [labels]="labels"
      [hasData]="hasData$ | async"
      [chartOptions]="chartOptions$ | async"
      currency="$"
      noDataAlertMessage="You have no discounts in the selected period"
      [enableLegend]="chartLegend$ | async"
      [gaugeValue]="gaugeValue"
      [gaugeLabel]="gaugeLabel"
      [gaugeSize]="300"
      [gaugeDur]="2500"
      [gaugeMax]="maxGoal"
      [newLogo]="true"
      [appendCurrency]="false"
      [currency]="'$'"
      [paTableData]="tableData"
      [enablePaTableView]="this.isTableIconVisible$ | async"
      [maxBarsAlertMsg]="showMaxBarsAlertMsg$ | async"
    ></app-chart>
  `,
})
export class CaTotalDiscountComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  private destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  chartTitle = 'Total Discounts';

  datasets: any[] = [{ data: [] }];
  labels: string[] = [];
  tableData: Record<string, any>[] = [];

  total: number = 0;
  prev: number = 0;
  curr: number = 0;
  average: number = 0;
  goal: number = 0;
  maxGoal: number = 0;
  gaugeValue: number = 0;
  gaugeLabel: string = '';
  showTableInfo = false;
  newColors = [];
  legendSettings = {
    visible: false,
    position: top,
    labels: {
      usePointStyle: true,
    },
  };

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(v => v && v !== 'off'));
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caTotalDiscountsChartData$,
      this.caFacade.caTotalDiscountsTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
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
        this.tableData = (data.tableData ?? []).map(item => {
          return {
            Name: item.label,
            Discount: item.value,
          };
        });

        this.maxGoal = data.maxGoal;
        this.gaugeLabel = data.gaugeLabel;
        this.gaugeValue = data.gaugeValue;
        this.newColors = data.chartColors ?? [];
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  get chartType$() {
    return combineLatest([
      this.dentistFacade.isDentistMode$,
      this.layoutFacade.isTrend$,
      this.layoutFacade.compare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !isTrend && !isCompare) return 'arch';
        return !isDentistMode || !isTrend || isCompare ? 'doughnut' : 'bar';
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

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  get isCompare$() {
    return this.layoutFacade.compare$;
  }

  get isTableIconVisible$() {
    return combineLatest([this.isDentistMode$, this.isCompare$, this.hasData$, this.isTrend$]).pipe(
      map(
        ([isDentistMode, isCompare, hasData, isTrend]) =>
          (!(isDentistMode && isTrend) || isCompare) && this.tableData.length > 0 && hasData,
      ),
    );
  }

  get hasData$() {
    return combineLatest([
      this.dentistFacade.isDentistMode$,
      this.layoutFacade.isTrend$,
      this.layoutFacade.compare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !(isTrend || isCompare)) {
          return this.gaugeValue !== 0;
        } else {
          return this.datasets?.some(
            it => it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v)),
          );
        }
      }),
    );
  }

  get chartOptions$() {
    return combineLatest([this.dentistFacade.isDentistMode$, this.layoutFacade.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) =>
        !isDentistMode || !isTrend ? this.doughnutChartOptions : this.barChartOptionsTrend,
      ),
    );
  }
  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }
  get durationCurrLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationPrevLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get isLoading$() {
    return combineLatest([
      this.dentistFacade.isDentistMode$,
      this.layoutFacade.isTrend$,
      this.caFacade.isLoadingChartDesc$('caTotalDiscounts'),
      this.caFacade.isLoadingChartDesc$('caTotalDiscountsTrend'),
      this.caFacade.isLoadingCaNumComplaintsTrend$,
    ]).pipe(
      map(([isDentistMode, isTrend, isLoadingData, isLoadingTrendData]) =>
        !isDentistMode || !isTrend ? isLoadingData : isLoadingTrendData,
      ),
    );
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
                fillStyle: this.newColors[0].backgroundColor[i] ?? COLORS.even,
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
              ? +(tooltipItem.parsed._custom.max + tooltipItem.parsed._custom.min) / 2
              : v;
            var tlab = 0;
            if (typeof tooltipItem.chart.data.datasets[1] === 'undefined') {
            } else {
              const tval = tooltipItem.chart.data.datasets[1].data[tooltipItem.dataIndex];
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
