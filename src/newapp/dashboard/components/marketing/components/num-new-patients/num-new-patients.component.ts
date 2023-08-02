import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
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
import moment from "moment";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'num-new-patients-chart',
    templateUrl: './num-new-patients.component.html',
    styleUrls: ['./num-new-patients.component.scss']
})
export class MarketingNumNewPatientsComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get trendingIcon() {
        if(this.newNumPatientsVal >= this.newNumPatientsPrev){
            return 'trending_up';
        }
        return 'trending_down';
    };

    get maxNewNumPatientsGoal(){
        if(this.newNumPatientsVal > this.newNumPatientsGoal){
            return this.newNumPatientsVal;
        }else {
            return this.newNumPatientsGoal;
        }
    }

    get displayTitle$(){
        return this.marketingFacade.isActivePatients$.pipe(
            takeUntil(this.destroy$),
            map(v => {
                return v? 'No. Active Patients': 'No. New Patients'
            })
        )
    }

    get isActivePatients$(){
        return this.marketingFacade.isActivePatients$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    newNumPatientsVal = 0;
    newNumPatientsPrev = 0;
    newNumPatientsGoal = 0;

    datasets: ChartDataset[] = [];
    labels = [];

    get isLoading$() {
        return combineLatest([
            this.isTrend$,
            this.marketingFacade.isLoadingNewNumPatients$,
            this.marketingFacade.isLoadingNewNumPatientsTrend$
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

    get hasData$(){
      return combineLatest([
        this.isTrend$,
        this.isMultipleClinic$
      ]).pipe(
        map(([isTrend, isMulti]) => {
          if(isTrend || isMulti){
            return this.labels.length > 0
          }else{
            return this.newNumPatientsVal > 0;
          }
        })
      )
    }

    constructor(
        private marketingFacade: MarketingFacade,
        private clinicFacade: ClinicFacade,
        private layoutFacade: LayoutFacade,
        private decimalPipe: DecimalPipe
    ) {
        combineLatest([
            this.isTrend$,
            this.marketingFacade.newNumPatientsChartData$,
            this.marketingFacade.newNumPatientsTrendChartData$,
            this.marketingFacade.isActivePatients$,
            this.marketingFacade.activePatientsChartData$,
            this.marketingFacade.activePatientsTrendChartData$
        ]).pipe(
            takeUntil(this.destroy$)
        ).subscribe(([
            isTrend, chartData, trendChartData, isActive,
            activeChartData, activeTrendChartData
        ]) => {
            if(isActive){
                if(isTrend){
                    this.datasets = activeTrendChartData.datasets;
                    this.labels = activeTrendChartData.labels;
                }else{
                    this.datasets = activeChartData.datasets;
                    this.labels = activeChartData.labels;
                    this.newNumPatientsVal = activeChartData.activePatientsVal;
                    this.newNumPatientsPrev = activeChartData.activePatientsPrev;
                    this.newNumPatientsGoal = activeChartData.activePatientsGoal;
                }
            }else{
                if(isTrend){
                    this.datasets = trendChartData.datasets;
                    this.labels = trendChartData.labels;
                  }else{
                    this.datasets = chartData.datasets;
                    this.labels = chartData.labels;
                    this.newNumPatientsVal = chartData.newNumPatientsVal;
                    this.newNumPatientsPrev = chartData.newNumPatientsPrev;
                    this.newNumPatientsGoal = chartData.newNumPatientsGoal;
                  }
            }
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    get goalCount$(){
        return this.layoutFacade.dateRange$.pipe(
            takeUntil(this.destroy$),
            map(val => {
                switch(val.duration){
                    case 'w':
                    case 'm':
                    case 'lm':
                        return 1;
                    case 'q':
                    case 'lq':
                        return 3;
                    case 'cytd':
                        return moment().diff(moment().startOf('year'), 'months');
                    case 'lcytd':
                        return 12;
                    case 'fytd':
                        if(moment().month() + 1 <= 6){
                            return moment().diff(moment().subtract(1, 'year').month(6).date(1), 'months');
                        }else{
                            return moment().diff(moment().month(6).date(1), 'months');
                        }
                    case 'lfytd':
                        return 12;
                }
                return 1;
            })
        );
    }

    get chartOptions$(){
        return combineLatest([
            this.isTrend$,
            this.isMultipleClinic$
        ]).pipe(
            takeUntil(this.destroy$),
            map(([isTrend, isMultiClinic])=> {
                return (isTrend && isMultiClinic)? this.stackedChartOptionsMulti: this.stackedChartOptions
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
                  return ''
                }
              },
              title: (tooltipItems)=>{
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