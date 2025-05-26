import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel, generatingLegend_3 } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { combineLatest, map, Subject } from 'rxjs';

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

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  chartTitle = 'Total Discounts';

  datasets: any[] = [{ data: [] }];
  labels = [];
  tableData = [];

  public prev: number = 0;
  public curr: number = 0;
  public average: number = 0;
  public goal: number = 0;
  public maxGoal: number = 0;
  public gaugeValue: number = 0;
  public gaugeLabel: string = '';

  public newColors = [];

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
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

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  get isTableIconVisible$() {
    return combineLatest([
      this.dentistFacade.isDentistMode$,
      this.layoutFacade.compare$,
      this.hasData$,
      this.layoutFacade.isTrend$,
    ]).pipe(
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
