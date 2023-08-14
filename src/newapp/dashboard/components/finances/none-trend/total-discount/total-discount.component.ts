import { formatXTooltipLabel } from "@/app/util";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";
import { chartPlugin } from "@/newapp/shared/utils";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Chart, ChartOptions, Plugin } from "chart.js";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'total-discount-chart',
    templateUrl: './total-discount.component.html',
    styleUrls: ['./total-discount.component.scss']
})
export class FinanceTotalDiscountComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    datasets = [{data: []}];


    totalDiscountChartLabels = [];
    totalDiscountChartTotal = 0;
    totalDiscountChartTrendTotal = 0;

    get isLoading$() {
        return this.financeFacade.isLoadingFnTotalDiscount$.pipe(
            takeUntil(this.destroy$),
            v => v
        )
    };

    get trendingIcon() {
        if(this.totalDiscountChartTotal >= this.totalDiscountChartTrendTotal){
            return 'trending_up';
        }
        return 'trending_down';
    };

    get durationLabel$() {
        return this.layoutFacade.dateRange$.pipe(
            takeUntil(this.destroy$),
            map(val => {
                const menu = DateRangeMenus.find(m => m.range == val.duration);
                if(menu) return menu.label;
                else return 'Current';
            })
        )
    }

    get durationTrendLabel$() {
        return this.durationLabel$.pipe(
            takeUntil(this.destroy$),
            map(l => l.replace(/^Last/g, 'Previous').replace(/^This/g, 'Last')));
    }

    constructor(
        private financeFacade: FinanceFacade,
        private clinicFacade: ClinicFacade,
        private layoutFacade: LayoutFacade
    ) {
        combineLatest([
            this.clinicFacade.currentClinicId$,
            this.financeFacade.totalDiscountTotal$,
            this.financeFacade.totalDiscountTrendTotal$,
            this.financeFacade.totalDiscountData$,
        ]).pipe(
            takeUntil(this.destroy$)
        ).subscribe(([
            clinicId,
            totalDiscountTotal, 
            totalDiscountTrendTotal, 
            totalDiscountData
        ]) => {
            const chartData = [], chartLabels = [];

            if(typeof clinicId == 'string'){
                const data = _.chain(totalDiscountData).groupBy('clinicId').map(
                    (values, cId) => {
                        return {
                            clinicName: values[0].clinicName,
                            discounts: values.map(v => _.round(<number>v.discounts)) 
                        }
                    }
                ).value();

                data.forEach(v => {
                    chartData.push(_.sumBy(v.discounts, l => l));
                    chartLabels.push(v.clinicName);
                })
            }else{
                totalDiscountData.forEach((val, index) => {
                    const discounts = _.round(<number>val.discounts);
                    if(discounts > 0){
                        chartData.push(discounts);
                        chartLabels.push(val.providerName??'');
                    }
                });
            }

            this.totalDiscountChartTrendTotal = Math.round(totalDiscountTrendTotal??0);
            this.totalDiscountChartTotal = Math.round(totalDiscountTotal);
            this.totalDiscountChartLabels = chartLabels;
            this.datasets = [{data: chartData}];
        });
    }

    public pieChartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            display: true,
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 20
            },
            onClick: (event) => {
                event.native.stopPropagation();
            }
            },
            tooltip: {
                callbacks: {
                    label: tooltipItem => formatXTooltipLabel(tooltipItem),
                    title: () => ''
                }
            }
        },
    };

    public pieChartColors = [
        {
          backgroundColor: [
            '#6edbbb',
            '#b0fffa',
            '#abb3ff',
            '#ffb4b5',
            '#fffcac',
            '#FFE4E4',
            '#FFD578',
            '#54D2FF',
            '#E58DD7',
            '#A9AABC',
            '#F2ECFF',
            '#5689C9',
            '#F9F871'
          ]
        }
    ];

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    get plugins$() {
        return this.financeFacade.totalDiscountTotal$.pipe(
            takeUntil(this.destroy$),
            map( dC => {{
                return [chartPlugin(dC, true)];
            }})
        )
    }
}