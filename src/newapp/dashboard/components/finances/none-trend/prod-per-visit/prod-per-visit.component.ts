import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { FnProductionPerVisitItem } from '@/newapp/models/dashboard/finance';
import { externalTooltipHandler, splitName } from '@/newapp/shared/utils';
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

  get trendingIcon() {
    if (this.productionVisitVal >= this.productionVisitTrendVal) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  productionVisitVal = 0;
  productionVisitTrendVal = 0;

  chartData: FnProductionPerVisitItem[];

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
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration)
    );
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
    return this.financeFacade.isLoadingFnProdPerVisit$.pipe(
      takeUntil(this.destroy$),
      v => v
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$.pipe(
      takeUntil(this.destroy$),
      map(val => val)
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$.pipe(
      takeUntil(this.destroy$),
      map(l => l)
    );
  }

  get getTrendTip$() {
    return this.durationTrendLabel$.pipe(
      takeUntil(this.destroy$),
      map(v => {
        if (this.productionVisitTrendVal > 0) {
          return (
            v + ': $' + this.decimalPipe.transform(this.productionVisitTrendVal)
          );
        }
        return '';
      })
    );
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.financeFacade.prodPerVisitTotal$,
      this.financeFacade.prodPerVisitTrendTotal$,
      this.financeFacade.prodPerVisitData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([val, trendVal, visitData]) => {
        this.productionVisitVal = Math.round(val);
        this.productionVisitTrendVal = Math.round(trendVal);
        const chartLabels = [];

        this.datasets[0].data = [];
        this.chartData = visitData;
        visitData.forEach(d => {
          this.datasets[0].data.push(
            Math.round(parseFloat(<string>d.prodPerVisit ?? '0'))
          );
          chartLabels.push(d.clinicName);
        });

        this.labels = chartLabels;
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
              }).format(parseFloat(<string>extraData.numVisits))}`
            );
            return labelItems;
          },
          // remove title
          title: () => '',
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
