import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  formatXLabel,
  formatXTooltipLabel,
  generatingLegend,
  generatingLegend_3,
  splitName,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ChartOptions, LegendOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import {
  Observable,
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'caProduction-chart',
  templateUrl: './caProduction.component.html',
  styleUrls: ['./caProduction.component.scss'],
})
export class CaProductionComponent implements OnInit, OnDestroy {
  @Input() toolTip: string = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  prodChartNames: CA_PROD_CHART_NAME[] = [
    'Production',
    'Collection',
    'Collection-Exp',
  ];

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get trendingIcon() {
    if (this.total >= this.prev) {
      return 'trending_up';
    } else return 'trending_down';
  }

  get prodSelectShow$() {
    return this.caFacade.prodSelectTab$;
  }

  get colSelectShow$() {
    return this.caFacade.colSelectTab$;
  }

  get colExpSelectShow$() {
    return this.caFacade.colExpSelectTab$;
  }

  get durationLabel$(): Observable<string> {
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
      map(([durTrendLabel]) => {
        return durTrendLabel + ': $' + this.decimalPipe.transform(this.prev);
      })
    );
  }

  public get isEachClinicD4w$(): Observable<boolean> {
    return this.clinicFacade.isEachClinicD4w$;
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

  public goalCount: number = 0;
  public showTableInfo: boolean = false;
  public tableData = [];

  get isLegendVisible$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.isDentistMode$,
      this.isTrend$,
    ]).pipe(
      map(([clinics, isDentistMode, isTrend]) =>
        !isDentistMode ? clinics.length > 1 : false
      )
    );
  }

  get isLoading$() {
    return this.caFacade.isLoadingCaProduction$.pipe(distinctUntilChanged());
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  get chartName$() {
    return this.caFacade.prodChartName$;
  }

  get isCompare$() {
    return this.layoutFacade.compare$;
  }

  get hasData$(): Observable<boolean> {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.isCompare$,
    ]).pipe(
      map(([isDentistMode, isTrend, isCompare]) => {
        if (isDentistMode && !(isTrend || isCompare)) {
          return this.gaugeValue > 0;
        } else {
          return (
            this.datasets?.length > 0 &&
            this.datasets?.some(
              it =>
                it?.data?.length > 0 &&
                _.sumBy(it.data, v => parseFloat(<any>v))
            )
          );
        }
      })
    );
  }

  get avgMode$() {
    return this.layoutFacade.average$;
  }

  get isFooterEnabled$() {
    return this.caFacade.isHideFooterSection$.pipe(map(v => !v));
  }

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  get isMultiClinics$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isTableIconVisible$(): Observable<boolean> {
    return combineLatest([
      this.isDentistMode$,
      this.isCompare$,
      this.hasData$,
      this.isTrend$,
      this.isEachClinicD4w$,
    ]).pipe(
      map(
        ([isDentistMode, isCompare, hasData, isTrend, isEachClinicD4w]) =>
          (!(isDentistMode && isTrend) || isCompare) &&
          this.tableData.length > 0 &&
          hasData &&
          isEachClinicD4w
      )
    );
  }

  get isTrendIconVisible$() {
    return this.caFacade.isTrendIconVisible$;
  }

  get isGaugeChartVisible$(): Observable<boolean> {
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

  get noDataAlertMessage$() {
    return combineLatest([
      this.isDentistMode$,
      this.caFacade.prodChartName$,
      this.caFacade.prodSelectTab$,
      this.caFacade.colSelectTab$,
      this.caFacade.colExpSelectTab$,
    ]).pipe(
      map(
        ([
          isDentistMode,
          visibility,
          prodSelectShow,
          colSelectShow,
          colExpSelectShow,
        ]) => {
          switch (visibility) {
            case 'Production':
              if (!isDentistMode) {
                switch (prodSelectShow) {
                  case 'production_all':
                    return 'You have no production in the selected period';
                  case 'production_dentists':
                    return 'You have no Dentist production for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'production_oht':
                    return 'You have no OHT production for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no production in the selected period';
              }
            case 'Collection':
              if (!isDentistMode) {
                switch (colSelectShow) {
                  case 'collection_all':
                    return 'You have no collection in the selected period';
                  case 'collection_dentists':
                    return 'You have no Dentist Collection for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'collection_oht':
                    return 'You have no OHT Collection for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no collection in the selected period';
              }
            case 'Collection-Exp':
              if (!isDentistMode) {
                switch (colExpSelectShow) {
                  case 'collection_exp_all':
                    return 'You have no collection in the selected period';
                  case 'collection_exp_dentists':
                    return 'You have no Dentist Collection for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'collection_exp_oht':
                    return 'You have no OHT Collection for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no collection in the selected period';
              }
          }
        }
      )
    );
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
      this.caFacade.caProductionChartData$,
      this.caFacade.caProductionTrendChartData$,
      this.isCompare$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ([avgMode, isDentistMode, isTrend, data, trendData, isCompare]) => {
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
          if (!isDentistMode || isCompare) {
            this.tableData = data.tableData ?? [];
          } else {
            this.tableData = trendData.tableData ?? [];
          }

          this.maxGoal = data.maxGoal;
          this.gaugeLabel = data.gaugeLabel;
          this.gaugeValue = data.gaugeValue;
          this.setChartOptions(isDentistMode, isTrend, avgMode);
        }
      );
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

  onChangeProdSelectTab(event: MatSelectChange) {
    this.caFacade.setProdSelectTab(event.value);
  }

  onChangeColSelectTab(event: MatSelectChange) {
    this.caFacade.setColSelectTab(event.value);
  }

  onChangeColExpSelectTab(event: MatSelectChange) {
    this.caFacade.setColExpSelectTab(event.value);
  }

  private setChartOptions(
    isDentistMode: boolean,
    isTrend: boolean,
    avgMode: string
  ): void {
    if (!isDentistMode || !isTrend) {
      let options: ChartOptions = { ...this.barChartOptions };
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
      this.chartOptions = this.barChartOptionsTrend;
    }
  }

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
        ticks: {
          callback: (label: number, index, ticks) => {
            // when the floored value is the same as the value we have a whole number
            if (typeof label === 'number') {
              return '$' + this.decimalPipe.transform(label);
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
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
          // remove title
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
        grid: {
          display: true,
          offset: true,
        },
        ticks: {
          autoSkip: false,
        },
        offset: true,
        stacked: true,
      },
      y: {
        suggestedMin: 0,
        min: 0,
        beginAtZero: true,
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.decimalPipe.transform(label);
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      title: {
        display: false,
        text: '',
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          // use label callback to return the desired label
          label: tooltipItem => {
            if (tooltipItem.label.includes('WE ')) {
              return tooltipItem.label + ': $' + tooltipItem.formattedValue;
            }
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
              return (
                Tlable +
                splitName(tooltipItem.label).join(' ') +
                ': $' +
                this.decimalPipe.transform(<number>ylable)
              );
            }
          },
          title: function () {
            return '';
          },
        },
      },
      legend: generatingLegend_3(),
    },
  };
}
