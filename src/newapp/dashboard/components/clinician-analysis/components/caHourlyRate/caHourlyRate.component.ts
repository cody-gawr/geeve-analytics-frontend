import { splitName } from '@/app/util';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Clinic } from '@/newapp/models/clinic';
import { formatXLabel, formatXTooltipLabel } from '@/newapp/shared/utils';
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
  selector: 'caHourlyRate-chart',
  templateUrl: './caHourlyRate.component.html',
  styleUrls: ['./caHourlyRate.component.scss'],
})
export class CaHourlyRateComponent implements OnInit, OnDestroy {
  @Input() toolTip: string = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  hourlyRateChartNames: CA_PROD_CHART_NAME[] = [
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
    return this.caFacade.hourlyRateProdSelectTab$;
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
      map(([durTrendLabel]) => {
        return durTrendLabel + ': $' + this.decimalPipe.transform(this.prev);
      })
    );
  }

  public datasets: any[] = [{ data: [] }];
  public labels: any[] = [];
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

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return this.caFacade.isLoadingCaHourlyRateAll$;
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(map(v => v?.type));
  }

  get chartName$() {
    return this.caFacade.hourlyRateChartName$.pipe(map(v => v));
  }

  get chartOptions$() {
    return combineLatest([
      this.avgMode$,
      this.isDentistMode$,
      this.isTrend$,
    ]).pipe(
      map(([avgMode, isDentistMode, isTrend]) => {
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
          return options;
        } else {
          return this.barChartOptionsTrend;
        }
      })
    );
  }

  get hasData$() {
    return combineLatest([
      this.isCompare$,
      this.isDentistMode$,
      this.isTrend$,
    ]).pipe(
      map(([isCompare, isDentistMode, isTrend]) => {
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

  get isCompare$(): Observable<boolean> {
    return this.layoutFacade.compare$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(v => v && v !== 'off'));
  }

  get noDataAlertMessage$() {
    return combineLatest([
      this.isDentistMode$,
      this.caFacade.hourlyRateProdSelectTab$,
    ]).pipe(
      map(([isDentistMode, prodSelectShow]) => {
        if (!isDentistMode) {
          switch (prodSelectShow) {
            case 'hourly_rate_all':
              return 'You have no hourly rates for the selected period';
            case 'hourly_rate_dentists':
              return 'You have no Dentist hourly rates for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
            case 'hourly_rate_oht':
              return 'You have no OHT hourly rates for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
          }
        } else {
          return 'You have no hourly rates for the selected period';
        }
      })
    );
  }

  get currentClinics$(): Observable<Clinic[]> {
    return this.clinicFacade.currentClinics$;
  }

  get isTableIconVisible$(): Observable<boolean> {
    return this.isDentistMode$.pipe(map(v => !v && this.tableData.length > 0));
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
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caHourlyRateChartData$,
      this.caFacade.caHourlyRateTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(([isDentistMode, isTrend, data, trendData]) => {
        if (isTrend) {
          this.datasets = trendData.datasets ?? [];
          this.labels = trendData.labels ?? [];
        } else {
          this.datasets = data.datasets ?? [];
          this.labels = data.labels ?? [];
        }
        if (!isDentistMode || !isTrend) {
        } else {
        }

        this.total = data.total;
        this.prev = data.prev;
        this.average = data.average;
        this.goal = data.goal;
        if (!isDentistMode) {
          this.tableData = data.tableData ?? [];
        }
        this.maxGoal = data.maxGoal;
        this.gaugeLabel = data.gaugeLabel;
        this.gaugeValue = data.gaugeValue;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName: CA_PROD_CHART_NAME) {
    this.caFacade.setHourlyRateChartName(chartName);
  }

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  getAvgPluginOptions(avgVal): _DeepPartialObject<AnnotationPluginOptions> {
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
    this.caFacade.setHourlyRateProdSelectTab(event.value);
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
      legend: this.legendGenerator,
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
  };
}
