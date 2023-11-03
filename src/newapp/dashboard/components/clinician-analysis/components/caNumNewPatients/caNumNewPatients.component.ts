import { splitName } from '@/app/util';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart, ChartOptions, Plugin } from 'chart.js';
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
  selector: 'caNumNewPatients-chart',
  templateUrl: './caNumNewPatients.component.html',
  styleUrls: ['./caNumNewPatients.component.scss'],
})
export class CaNumNewPatientsComponent implements OnInit, OnDestroy {
  @Input() toolTip: string = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

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

  newpColors = [];

  legendSettings = {
    visible: false,
    position: top,
    labels: {
      usePointStyle: true,
    },
  };

  get isLoading$() {
    return combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.isLoadingCaNumNewPatients$,
      this.caFacade.isLoadingCaNumNewPatientsTrend$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([isDentistMode, isTrend, isLoadingData, isLoadingDataTrend]) => {
        if (!isDentistMode || !isTrend) {
          return isLoadingData;
        } else {
          return isLoadingDataTrend;
        }
      })
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(v => v?.type)
    );
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isDentistMode$]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, isDentistMode]) => {
        if (!isDentistMode || !isTrend) return this.doughnutChartOptions;
        else return this.barChartOptionsTrend;
      })
    );
  }

  get chartPlugins$() {
    return combineLatest([this.isTrend$, this.isDentistMode$]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, isDentistMode]) => {
        if (!isDentistMode || !isTrend) return this.beforeDrawChart(this.total);
        else return null;
      })
    );
  }

  get hasData$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      map(([isDentistMode, isTrend]) => {
        if (!isDentistMode || isTrend) {
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
    return this.caFacade.isHideFooterSection$.pipe(map(v => !v));
  }

  // get isAllDentist$() {
  //   return this.dentistFacade.currentDentistId$.pipe(
  //     takeUntil(this.destroy$),
  //     map(v => {
  //       return v === 'all';
  //     })
  //   );
  // }

  get isDentistMode$() {
    return this.caFacade.isDentistMode$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(v => v && v !== 'off')
    );
  }

  get chartType$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      takeUntil(this.destroy$),
      map(([isDentistMode, isTrend]) => {
        if (!isDentistMode || !isTrend) {
          return 'doughnut';
        } else {
          return 'bar';
        }
      })
    );
  }

  get chartLegend$() {
    return combineLatest([this.isDentistMode$, this.isTrend$]).pipe(
      takeUntil(this.destroy$),
      map(([isDentistMode, isTrend]) => {
        if (!isDentistMode || !isTrend) {
          return this.legendSettings;
        } else {
          return false;
        }
      })
    );
  }

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade,
    private clinicFacade: ClinicFacade
  ) {
    combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.caFacade.caNumNewPatientsChartData$,
      this.caFacade.caNumNewPatientsTrendChartData$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
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

  ngOnInit(): void {}

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

  public doughnutChartOptions: ChartOptions = {
    // scaleShowVerticalLines: false,
    // borderWidth: 0,
    responsive: true,
    hover: { mode: null },
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutSine',
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 5,
          generateLabels: chart => {
            var data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i) => {
                // var meta = chart.getDatasetMeta(0);
                var ds = this.newpColors[0];
                // var arc = meta.data[i];
                // var custom = (arc && arc.custom) || {};
                // const regex = /\w+\s\w+(?=\s)|\w+/g;
                // var names = label.toString().trim().match(regex);
                // var labls = '';
                // var name = names[0].split(' ');
                // if (names.length == 3) {
                //   labls = `${names[0]}`;
                // } else if (names.length == 2) {
                //   if (name.length == 2) {
                //     labls = `${names[0][0]} ${name[1]}`;
                //   } else {
                //     labls = `${names[0][0]} ${names[1]}`;
                //   }
                // } else {
                //   labls = `${names[0]}`;
                // }
                return {
                  text: <string>formatXLabel(label),
                  fillStyle: ds.backgroundColor[i] ?? COLORS.even,
                  strokeStyle: '#fff',
                  //hidden: isNaN(ds.data[i]) || meta.data[i].active,
                  index: i,
                };
              });
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
    // elements: {
    //   center: {
    //     text: '',
    //     sidePadding: 40,
    //     minFontSize: 15
    //   }
    // }
  };

  public barChartOptionsTrend: ChartOptions<'bar'> = {
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
              return Tlable + tooltipItem.label + ': ' + ylable;
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
