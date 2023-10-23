import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel, formatXTooltipLabel } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnnotationPluginOptions } from 'chartjs-plugin-annotation';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

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
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration)
    );
  }

  get trendingIcon() {
    if (this.total >= this.prev) {
      return 'trending_up';
    } else return 'trending_down';
  }

  get prodSelectShow$() {
    return this.caFacade.prodSelectTab$.pipe(takeUntil(this.destroy$));
  }

  get colSelectShow$() {
    return this.caFacade.colSelectTab$.pipe(takeUntil(this.destroy$));
  }

  get colExpSelectShow$() {
    return this.caFacade.colExpSelectTab$.pipe(takeUntil(this.destroy$));
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$.pipe(
      takeUntil(this.destroy$),
      map(val => val)
    );
  }

  get showGoals$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.enableGoal)
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$.pipe(
      takeUntil(this.destroy$),
      map(l => l)
    );
  }

  get getTrendTip$() {
    return combineLatest([this.durationTrendLabel$]).pipe(
      takeUntil(this.destroy$),
      map(([durTrendLabel]) => {
        return durTrendLabel + ': $' + this.decimalPipe.transform(this.prev);
      })
    );
  }

  datasets: any = [{ data: [] }];
  labels = [];
  prev = 0;

  total = 0;

  average = 0;

  goal = 0;
  maxGoal = 0;
  gaugeValue = 0;
  gaugeLabel = '';

  goalCount = 0;
  showTableInfo = false;
  tableData = [];

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return this.caFacade.isLoadingCaHourlyRateAll$.pipe(
      takeUntil(this.destroy$)
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(v => v.type)
    );
  }

  get chartName$() {
    return this.caFacade.hourlyRateChartName$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get chartOptions$() {
    return combineLatest([this.avgMode$]).pipe(
      takeUntil(this.destroy$),
      map(([avgMode]) => {
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
      })
    );
  }

  get hasData$() {
    return combineLatest([this.isAllDentist$, this.isTrend$]).pipe(
      map(([isAll, isTrend]) => {
        if (isAll || isTrend) {
          return this.datasets[0]?.data.length > 0;
        } else {
          return this.gaugeValue > 0;
        }
      })
    );
  }

  get avgMode$() {
    return this.layoutFacade.average$.pipe(takeUntil(this.destroy$));
  }

  get isEnableFooter$() {
    return combineLatest([
      this.authFacade.rolesIndividual$,
      this.layoutFacade.compare$,
      this.isTrend$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(
        ([v, cMode, isTrend]) =>
          v?.type == 4 && v?.plan != 'lite' && cMode && isTrend
      ),
      map(v => !v)
    );
  }

  get isAllDentist$() {
    return this.dentistFacade.currentDentistId$.pipe(
      takeUntil(this.destroy$),
      map(v => {
        return v === 'all';
      })
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(v => v && v !== 'off')
    );
  }

  get noDataAlertMessage$() {
    return combineLatest([
      this.isAllDentist$,
      this.caFacade.hourlyRateChartName$,
      this.caFacade.hourlyRateProdSelectTab$,
      this.caFacade.hourlyRateColSelectTab$,
      this.caFacade.hourlyRateColExpSelectTab$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(
        ([
          isAllDentist,
          visibility,
          prodSelectShow,
          colSelectShow,
          colExpSelectShow,
        ]) => {
          switch (visibility) {
            case 'Production':
              if (isAllDentist) {
                switch (prodSelectShow) {
                  case 'production_all':
                    return 'You have no hourly rates for the selected period';
                  case 'production_dentists':
                    return 'You have no Dentist hourly rates for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'production_oht':
                    return 'You have no OHT hourly rates for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no hourly rates for the selected period';
              }
            case 'Collection':
              if (isAllDentist) {
                switch (colSelectShow) {
                  case 'collection_all':
                    return 'You have no hourly rates in the selected period';
                  case 'collection_dentists':
                    return 'You have no Dentist hourly rates for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'collection_oht':
                    return 'You have no OHT hourly rates for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no hourly rates in the selected period';
              }
            case 'Collection-Exp':
              if (isAllDentist) {
                switch (colExpSelectShow) {
                  case 'collection_exp_all':
                    return 'You have no hourly rates in the selected period';
                  case 'collection_exp_dentists':
                    return 'You have no Dentist hourly rates for the selected period. Have you configured your Dentists in Settings -> Clinics -> Dentists?';
                  case 'collection_exp_oht':
                    return 'You have no OHT hourly rates for the selected period. Have you configured your OHTs in Settings -> Clinics -> Dentists?';
                }
              } else {
                return 'You have no hourly rates in the selected period';
              }
          }
        }
      )
    );
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade
  ) {
    combineLatest([this.caFacade.caHourlyRateChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([data]) => {
        this.datasets = data.datasets ?? [];
        this.labels = data.labels ?? [];
        this.total = data.total;
        this.prev = data.prev;
        this.average = data.average;
        this.goal = data.goal;
        this.tableData = data.tableData ?? [];
        this.maxGoal = data.maxGoal;
        this.gaugeLabel = data.gaugeLabel;
        this.gaugeValue = data.gaugeValue;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    switch (chartName) {
      case 'Production':
        this.caFacade.setHourlyRateProdSelectTab('production_all');
        break;
      case 'Collection':
        this.caFacade.setHourlyRateColSelectTab('collection_all');
        break;
      case 'Collection-Exp':
        this.caFacade.setHourlyRateColExpSelectTab('collection_exp_all');
        break;
    }
    this.caFacade.setHourlyRateChartName(chartName);
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
          // mode: 'horizontal',
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
      // drawTime: 'afterDatasetsDraw',
      annotations: [
        {
          drawTime: 'afterDraw',
          type: 'line',
          // mode: 'horizontal',
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

  onChangeProdSelectTab(event) {
    this.caFacade.setHourlyRateProdSelectTab(event.value);
  }

  onChangeColSelectTab(event) {
    this.caFacade.setHourlyRateColSelectTab(event.value);
  }

  onChangeColExpSelectTab(event) {
    this.caFacade.setHourlyRateColExpSelectTab(event.value);
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
    // borderRadius: 50,
    hover: { mode: null },
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    // curvature: 1,
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
}
