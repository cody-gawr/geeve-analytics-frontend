import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { DashboardFacade } from "@/newapp/dashboard/facades/dashboard.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { MarketingFacade } from "@/newapp/dashboard/facades/marketing.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";
import { splitName } from "@/newapp/shared/utils";
import { DecimalPipe } from "@angular/common";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChartOptions, LegendOptions, ChartDataset } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'new-patients-acq-chart',
    templateUrl: './new-patients-acq.component.html',
    styleUrls: ['./new-patients-acq.component.scss']
})
export class MarketingNewPatientsAcqComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get trendingIcon() {
        if(this.newPatientsAcqVal >= this.newPatientsAcqPrev){
            return 'trending_up';
        }
        return 'trending_down';
    };

    get maxNewPatientsAcqGoal(){
        if(this.newPatientsAcqVal > this.newPatientsAcqGoal){
            return this.newPatientsAcqVal;
        }else {
            return this.newPatientsAcqGoal;
        }
    }


    get isActivePatients$(){
        return this.marketingFacade.isActivePatients$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get hasData$(){
      return combineLatest([
        this.isTrend$,
        this.isMultipleClinic$
      ]).pipe(
        map(([isTrend, isMulti]) => {
          if(isTrend || isMulti){
            return this.labels.length > 0
          }else{
            return this.newPatientsAcqVal > 0;
          }
        })
      )
    }

    newPatientsAcqVal = 0;
    newPatientsAcqPrev = 0;
    newPatientsAcqGoal = 0;

    datasets: ChartDataset[] = [];
    labels = [];

    get isLoading$() {
        return combineLatest([
            this.isTrend$,
            this.marketingFacade.isLoadingNewPatientsAcq$,
            this.marketingFacade.isLoadingNewPatientsAcqTrend$
        ]) .pipe(
            takeUntil(this.destroy$),
            map(([isTrend, isLoading, isTrendLoading]) => {
                return isTrend?isTrendLoading:isLoading;
            })
        )
    };

    get isMultipleClinic$(){
        return this.clinicFacade.currentClinicId$.pipe(
          takeUntil(this.destroy$),
          map(v => typeof v == 'string')
        )
    }

    get durationLabel$() {
        return this.layoutFacade.dateRange$.pipe(
            takeUntil(this.destroy$),
            map(val => {
                const menu = DateRangeMenus.find(m => m.range == val.duration);
                if(menu) return menu.label;
                else return 'Current';
            })
        );
    }

    get durationTrendLabel$() {
        return this.durationLabel$.pipe(
            takeUntil(this.destroy$),
            map(l => l.replace(/^Last/g, 'Previous').replace(/^This/g, 'Last')));
    }

    get isTrend$(){
        return this.layoutFacade.trend$.pipe(
            takeUntil(this.destroy$),
            map(t => t !== 'off')
        )
    }

    get isConnectedWith$(){
        return this.dashboardFacade.connectedWith$.pipe(
            takeUntil(this.destroy$),
            map(v => v && v != 'none')
        )
    }

    get isFullMonthsDateRange$() {
        return this.layoutFacade.isFullMonthsDateRange$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        );
    }

    constructor(
        private marketingFacade: MarketingFacade,
        private clinicFacade: ClinicFacade,
        private layoutFacade: LayoutFacade,
        private decimalPipe: DecimalPipe,
        private dashboardFacade: DashboardFacade
    ) {
        combineLatest([
            this.isTrend$,
            this.marketingFacade.newPatientsAcqChartData$,
            this.marketingFacade.newPatientsAcqTrendChartData$,
            // this.marketingFacade.isActivePatients$,
            // this.marketingFacade.activePatientsChartData$,
            // this.marketingFacade.activePatientsTrendChartData$
        ]).pipe(
            takeUntil(this.destroy$)
        ).subscribe(([
            isTrend, chartData, trendChartData
        ]) => {
            
                if(isTrend){
                    this.datasets = trendChartData.datasets;
                    this.labels = trendChartData.labels;
                }else{
                    this.datasets = chartData.datasets;
                    this.labels = chartData.labels;
                    this.newPatientsAcqVal = chartData.newPatientAcqVal;
                    this.newPatientsAcqPrev = chartData.newPatientAcqPrev;
                    this.newPatientsAcqGoal = chartData.newPatientAcqGoal;
                }
            
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    get chartOptions$(){
        return combineLatest([
            this.isTrend$,
            this.isMultipleClinic$
        ]).pipe(
            takeUntil(this.destroy$),
            map(([isTrend, isMultiClinic])=> {
                return isTrend? this.barChartOptions: this.stackedChartOptions
            })
        )
    }

    public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          generateLabels: (chart) => {
            let labels = [];
            let bg_color = {};
            chart.data.datasets.forEach((item) => {
              item.data.forEach((val: number) => {
                if (val > 0) {
                  labels.push(item.label);
                  bg_color[item.label] = item.backgroundColor;
                }
              });
            });
            labels = [...new Set(labels)];
            labels = labels.splice(0, 10);
            return labels.map((item) => ({
              text: item,
              strokeStyle: bg_color[item],
              fillStyle: bg_color[item]
            }));
          },
        },
    };

    public stackedChartOptions: ChartOptions<'bar'> = {
        elements: {
          point: {
            radius: 5,
            hoverRadius: 7,
            pointStyle: 'rectRounded',
            hoverBorderWidth: 7
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
          easing: 'easeOutSine'
        },
        scales: {
          x: 
            {
              stacked: true,
              ticks: {
                autoSkip: false
              }
            }
          ,
          y: 
            {
              beginAtZero: true,
            }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            mode: 'x',
            displayColors(ctx, options) {
              return !ctx.tooltip
            },
            callbacks: {
              label: (tooltipItems) => {
                return (
                  tooltipItems.label +
                  ': ' +
                  this.decimalPipe.transform(tooltipItems.parsed.y)
                );
              },
              title: function () {
                return '';
              }
            }
          }
        },
    };
    public barChartOptions: ChartOptions = {
        // showLines: false,
        animation: {
          duration: 1500,
          easing: 'easeOutSine'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: 
            {
              grid: { display: true },
              ticks: {
                autoSkip: false
              }
            }
          ,
          y:
            {
              suggestedMin: 0,
              ticks: {
                callback: (label: string) => {
                  // when the floored value is the same as the value we have a whole number
                  return '$' + this.decimalPipe.transform(label);
                }
              }
            }
        },
        plugins: {
          tooltip: {
            mode: 'x',
            // custom: (tooltip: Chart.ChartTooltipModel) => {
            //   tooltip.displayColors = false;
            // },
            callbacks: {
              label: (tooltipItems) => {
                return (
                  tooltipItems.label +
                  ': $' +
                  tooltipItems.formattedValue
                );
              },
              title: function () {
                return '';
              }
            }
          },
          legend: this.stackLegendGenerator
        }
    };
    
    barChartColors = [
        { backgroundColor: '#39acac' },
        { backgroundColor: '#48daba' }
    ];

    lineChartColors = [
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
        "#EEEEF8",
        "#119682",
    ];
}