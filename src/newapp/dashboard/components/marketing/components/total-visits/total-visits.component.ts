import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { DashboardFacade } from "@/newapp/dashboard/facades/dashboard.facade";
import { MarketingFacade } from "@/newapp/dashboard/facades/marketing.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";
import { DecimalPipe } from "@angular/common";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChartOptions, LegendOptions, ChartDataset } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'mk-total-visits-chart',
    templateUrl: './total-visits.component.html',
    styleUrls: ['./total-visits.component.scss']
})
export class MarketingTotalVisitsComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get trendingIcon() {
        if(this.totalVisitsVal >= this.totalVisitsPrev){
            return 'trending_up';
        }
        return 'trending_down';
    };

    get maxTotalVisitsGoal(){
        if(this.totalVisitsVal > this.totalVisitsGoal){
            return this.totalVisitsVal;
        }else {
            return this.totalVisitsGoal;
        }
    };

    get isActivePatients$(){
        return this.marketingFacade.isActivePatients$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    };

    totalVisitsVal = 0;
    totalVisitsPrev = 0;
    totalVisitsGoal = 0;

    datasets: ChartDataset[] = [];
    labels = [];

    get isLoading$() {
        return combineLatest([
            this.isTrend$,
            this.marketingFacade.isLoadingTotalVisits$,
            this.marketingFacade.isLoadingTotalVisitsTrend$
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

    get hasData$(){
        return combineLatest([
          this.isTrend$,
          this.isMultipleClinic$
        ]).pipe(
          map(([isTrend, isMulti]) => {
            if(isTrend || isMulti){
              return this.labels.length > 0
            }else{
              return this.totalVisitsVal > 0;
            }
          })
        )
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
            this.marketingFacade.totalVisitsChartData$,
            this.marketingFacade.totalVisitsTrendChartData$,
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
                    this.totalVisitsVal = chartData.totalVisitsVal;
                    this.totalVisitsPrev = chartData.totalVisitsPrev;
                    this.totalVisitsGoal = chartData.totalVisitsGoal;
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
                return isMultiClinic? this.stackedChartOptionsMulti: this.stackedChartOptions
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
    public stackedChartOptionsMulti: ChartOptions<'bar'> = {
        elements: {
          point: {
            radius: 5,
            hoverRadius: 7,
            pointStyle: 'rectRounded',
            hoverBorderWidth: 7
          }
        },
        // scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        // barThickness: 10,
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
              stacked: true,
              ticks: {
                // callback: function (item) {
                //   return item;
                // }
              }
            }
        },
        plugins: {
          legend: this.stackLegendGenerator,
          tooltip: {
            mode: 'x',
            callbacks: {
              label: function (tooltipItems) {
                if(tooltipItems.parsed.y > 0){
                  return (
                    tooltipItems.dataset.label + ': ' + tooltipItems.formattedValue
                  );
                }else{
                  return '';
                }
              },
              title: (tooltipItems) => {
                const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
                return `${tooltipItems[0].label}: ${this.decimalPipe.transform(sumV)}`;
              }
            }
          }
        },
    
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