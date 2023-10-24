import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { COLORS } from '@/newapp/constants';
import { ClinicianAnalysisFacade } from '@/newapp/dashboard/facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { formatXLabel } from '@/newapp/shared/utils';
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
} from 'rxjs';

@Component({
  selector: 'caNumComplaints-chart',
  templateUrl: './caNumComplaints.component.html',
  styleUrls: ['./caNumComplaints.component.scss'],
})
export class CaNumComplaintsComponent implements OnInit, OnDestroy {
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

  get legend$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([v]) => {
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return this.caFacade.isLoadingCaNumComplaints$.pipe(
      takeUntil(this.destroy$)
    );
  }

  get userType$() {
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(v => v.type)
    );
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend]) => {
        return this.doughnutChartOptions;
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
  newpColors = [];

  constructor(
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private decimalPipe: DecimalPipe,
    private dentistFacade: DentistFacade
  ) {
    combineLatest([this.caFacade.caNumComplaintsChartData$])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
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
        this.newpColors = data.chartColors ?? [];
      });
  }

  ngOnInit(): void {}

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
}
