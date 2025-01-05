import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { FnProductionPerDayItem, FnProductionPerVisitItem } from '@/newapp/models/dashboard/finance';
import {
  externalTooltipHandler,
  generatingLegend_3,
  splitName,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'prod-per-visit-chart',
  templateUrl: './prod-per-visit.component.html',
  styleUrls: ['./prod-per-visit.component.scss'],
})
export class FinanceProdPerVisitComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  chartNames: FN_PROD_PER_VISIT_CHART_NAME[] = [
    'Production Per Visit',
    'Production Per Day',
  ];

  get trendingIcon() {
    if (this.productionVisitVal >= this.productionVisitTrendVal) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  productionVisitVal = 0;
  productionVisitTrendVal = 0;

  chartData: Array<FnProductionPerVisitItem & {numTotal: number | string}> | Array<FnProductionPerDayItem & {numTotal: number | string}>;

  datasets = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
    },
  ];
  labels = [];

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get hasData$() {
    return this.isMultipleClinic$.pipe(
      map(v => {
        if (v) {
          return this.labels.length > 0;
        } else {
          return this.productionVisitVal > 0;
        }
      })
    );
  }

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerVisit$;
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get getTrendTip$() {
    return this.durationTrendLabel$.pipe(
      map(v =>
        this.productionVisitTrendVal > 0
          ? v + ': $' + this.decimalPipe.transform(this.productionVisitTrendVal)
          : ''
      )
    );
  }

  get chartName$() {
    return this.financeFacade.prodPerVisitChartName$;
  }

  switchChartName(chartName: FN_PROD_PER_VISIT_CHART_NAME) {
    this.financeFacade.setProdPerVisitChartName(chartName);
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    // combineLatest([
    //   this.financeFacade.prodPerVisitChartName$,

    //   this.financeFacade.prodPerVisitTotal$,
    //   this.financeFacade.prodPerVisitTrendTotal$,
    //   this.financeFacade.prodPerVisitData$,

    //   this.financeFacade.prodPerDayTotal$,
    //   this.financeFacade.prodPerDayTrendTotal$,
    //   this.financeFacade.prodPerDayData$,
    // ])
      this.financeFacade.prodPerVisitChartData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.datasets = data.datasets;
        this.chartData = data.chartData;
        this.labels = data.chartLabels;
        this.productionVisitVal = data.productionVisitVal;
        this.productionVisitTrendVal = data.productionVisitTrendVal;
        // let _val: number, _trendVal: number, _chartData: any;
        // if(chartName === 'Production Per Day'){
        //   _val = dayVal;
        //   _trendVal = dayTrendVal;
        //   _chartData = dayData;
        // }else{
        //   _val = val;
        //   _trendVal = trendVal;
        //   _chartData = visitData;
        // }
        
        // this.productionVisitVal = Math.round(_val);
        // this.productionVisitTrendVal = Math.round(_trendVal);

        // const chartLabels = [];

        // this.datasets[0].data = [];
        // this.chartData = _chartData;
  
        // this.chartData.forEach((d: (FnProductionPerDayItem & {numTotal: string | number}) | (FnProductionPerVisitItem & {numTotal: string | number})) => {
        //   const v = <string>(chartName === 'Production Per Day'?(<FnProductionPerDayItem>d).prodPerDay:(<FnProductionPerVisitItem>d).prodPerVisit);
        //   this.datasets[0].data.push(
        //     Math.round(parseFloat(v ?? '0'))
        //   );
        //   chartLabels.push(d.clinicName);
        //   d.numTotal = chartName === 'Production Per Day'?(<FnProductionPerDayItem>d).numDays:(<FnProductionPerVisitItem>d).numVisits;
        // });

        // this.labels = chartLabels;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  public barChartOptions: ChartOptions<'bar'> = {
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
    // scaleStartValue: 0,
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
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          // use label callback to return the desired label
          label: tooltipItem => {
            const extraData = this.chartData[tooltipItem.dataIndex];
            const labelItems = [];
            labelItems.push(
              `Prod Per Visit : ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(Number(tooltipItem.parsed.y))}`
            );

            labelItems.push(
              `Production : ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(parseFloat(<string>extraData.production))}`
            );

            labelItems.push(
              `Num Visits : ${new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(parseFloat(<string>extraData.numTotal))}`
            );
            return labelItems;
          },
          // remove title
          title: () => '',
        },
      },
      legend: generatingLegend_3(),
    },
  };
}
