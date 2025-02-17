import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
  generatingLegend_4,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import { ChartTip } from '@/newapp/models/dashboard/finance';

@Component({
  selector: 'prod-collection-chart',
  templateUrl: './prod-collection.component.html',
  styleUrls: ['./prod-collection.component.scss'],
})
export class FinanceProdColComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info.toLowerCase() === 'coming-soon';
  }  
  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingTotalProduction$,
      this.financeFacade.isLoadingCollection$,
    ]).pipe(map(([v, v1]) => v && v1));
  }

  get chartOptions$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v =>
        typeof v === 'string'
          ? this.labelBarOptionsMultiTC
          : this.labelBarOptionsTC
      )
    );
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  datasets: ChartDataset[] = [];
  labels = [];

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get totalProdVal$() {
    return this.financeFacade.productionVal$;
  }

  get totalProdTrendVal$() {
    return this.financeFacade.productionTrendVal$;
  }

  get collectionVal$() {
    return this.financeFacade.collectionVal$;
  }

  get collectionTrendVal$() {
    return this.financeFacade.collectionTrendVal$;
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  constructor(
    private financeFacade: FinanceFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.financeFacade.productionVal$,
      this.financeFacade.prodData$,
      this.financeFacade.collectionData$,
      this.financeFacade.collectionVal$,
      this.clinicFacade.currentClinicId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([prodVal, prodData, collData, collectionVal, clinicId]) => {
        let chartData = [];

        if (typeof clinicId == 'string') {
          const pChartData = [];
          prodData.forEach((item, index) => {
            pChartData.push({
              data: [Math.round(parseFloat(<string>item.production))],
              label: item.clinicName,
              backgroundColor: DoughnutChartColors[index],
              hoverBackgroundColor: DoughnutChartColors[index],
            });
          });
          chartData = pChartData
            .sort((a, b) => a.data[0] - b.data[0])
            .map(item => {
              const collectionItem = collData.find(
                ele => ele.clinicName == item.label
              );
              return {
                ...item,
                data: !!collectionItem
                  ? [
                      ...item.data,
                      Math.round(parseFloat(<string>collectionItem.collection)),
                    ]
                  : item.data,
              };
            });
          this.datasets = chartData;
          if (prodData.length > 0 || collData.length > 0) {
            this.labels = ['Production', 'Collection'];
          } else {
            this.labels = [];
          }
        } else {
          chartData.push(prodVal);
          chartData.push(collectionVal);
          this.datasets = [
            {
              data: chartData,
              backgroundColor: ['#ffb4b5', '#4ccfae'],
              hoverBackgroundColor: ['#ffb4b5', '#4ccfae'],
            },
          ];
          if (prodVal > 0 || collectionVal > 0) {
            this.labels = ['Production', 'Collection'];
          } else {
            this.labels = [];
          }
        }
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  public labelBarOptionsTC: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
        },
        stacked: false,
      },
      y: {
        stacked: false,
        grid: {
          color: 'transparent',
        },
        suggestedMin: 0,
        ticks: {
          callback: function (label: string | number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            return `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label))}`;
          },
          autoSkip: false,
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(tooltipItems.parsed.y);
          },
        },
      },
    },
  };

  public labelBarOptionsMultiTC: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: string | number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label));
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: generatingLegend_4(),
      tooltip: {
        mode: 'x',
        itemSort: (a, b) => b.parsed.y - a.parsed.y,
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: function (tooltipItems) {
            return `${tooltipItems[0].label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(_.sumBy(tooltipItems, t => t.parsed.y))}`;
          },
        },
      },
    },
  };
}
