import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  formatXLabel,
  formatXTooltipLabel,
  generatingLegend,
  generatingLegend_3,
  renderTooltipLabel,
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
  BehaviorSubject,
  takeUntil,
  combineLatest,
  map,
  filter,
  distinctUntilChanged,
  tap,
} from 'rxjs';

@Component({
  selector: 'caProduction-chart',
  templateUrl: './caProduction.component.html',
  styleUrls: ['./caProduction.component.scss'],
})
export class CaProductionComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;

  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  prodChartNames: CA_PROD_CHART_NAME[] = [
    'Production',
    'Collection',
    'Collection-Exp',
  ];
  
  get showTableView$() {
    return combineLatest([
      this.isTableViewEnabled$,
      this.isTableIconVisible$
    ]) .pipe(map(
      ([v1, v2]) => v1 && v2
    ))
  }

  get showMaxBarsAlert$() {
    return this.showTableView$.pipe(
      map(v => {
        return !v && (this.tableData?.length > this.labels?.length);
      })
    ) 
  }
  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }
  get prodChartNames$() {
    return this.isEachClinicD4w$.pipe(
      map(v => {
        return v
          ? ['Production', 'Collection', 'Collection-Exp']
          : ['Production', 'Collection'];
      })
    );
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
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
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

  public isTableViewEnabled = new BehaviorSubject<boolean>(false);
  public isTableViewEnabled$ = this.isTableViewEnabled.asObservable();
  public tableData = [];
  public tabSelectionType = 'all';

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
          return this.gaugeValue !== 0;
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

  get isFooterEnabled$(): Observable<boolean> {
    return combineLatest([
      this.caFacade.isHideFooterSection$,
      this.isWeeklyModeEnabled$,
    ]).pipe(
      map(
        ([isFooterSectionHidden, isWeeklyModeEnabled]) =>
          !(isFooterSectionHidden || isWeeklyModeEnabled)
      )
    );
  }

  get isWeeklyModeEnabled$(): Observable<boolean> {
    return combineLatest([
      this.isTableViewEnabled$,
      this.isDentistMode$,
      this.isEachClinicD4w$,
    ]).pipe(
      map(
        ([isTableViewEnabled, isDentistMode, isEachClinicD4w]) =>
          isTableViewEnabled && isDentistMode && isEachClinicD4w
      )
    );
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
    ]).pipe(
      map(([isDentistMode, isCompare, hasData, isTrend]) => {
        return (
          (!(isDentistMode && isTrend) || isCompare) &&
          (this.tableData.length > 0 || hasData) &&
          !this.isComingSoon
        );
      })
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

  get goalCount$(): Observable<number> {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
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
      this.goalCount$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ([
          avgMode,
          isDentistMode,
          isTrend,
          data,
          trendData,
          isCompare,
          goalCount,
        ]) => {
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
          this.setChartOptions(isDentistMode, isTrend, avgMode, goalCount);
        }
      );
    this.dentistFacade.currentDentistId$
      .pipe(
        filter(dentistId => dentistId != 'all'),
        distinctUntilChanged()
      )
      .subscribe(() => this.isTableViewEnabled.next(false));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName, prevChartName) {
    switch (chartName) {
      case 'Production':
        this.caFacade.setProdSelectTab(<any>`production_${this.tabSelectionType}`);
        break;
      case 'Collection':
        this.caFacade.setColSelectTab(<any>`collection_${this.tabSelectionType}`);
        break;
      case 'Collection-Exp':
        this.caFacade.setColExpSelectTab(<any>`collection_exp_${this.tabSelectionType}`);
        break;
    }
    this.caFacade.setProdChartName(chartName);
  }

  toggleTableView() {
    this.isTableViewEnabled.next(!this.isTableViewEnabled.value);
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
    const t = event.value.split('_');
    this.tabSelectionType = t[t.length -1];
    this.caFacade.setProdSelectTab(event.value);
  }

  onChangeColSelectTab(event: MatSelectChange) {
    const t = event.value.split('_');
    this.tabSelectionType = t[t.length -1];
    this.caFacade.setColSelectTab(event.value);
  }

  onChangeColExpSelectTab(event: MatSelectChange) {
    const t = event.value.split('_');
    this.tabSelectionType = t[t.length -1];
    this.caFacade.setColExpSelectTab(event.value);
  }

  private setChartOptions(
    isDentistMode: boolean,
    isTrend: boolean,
    avgMode: string,
    goalCount: number
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
          label: tooltipItem =>
            renderTooltipLabel(tooltipItem, '$', this.decimalPipe),
          title: function () {
            return '';
          },
        },
      },
      legend: generatingLegend_3(),
    },
  };
}
