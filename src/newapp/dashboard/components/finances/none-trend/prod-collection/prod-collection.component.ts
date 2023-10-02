import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { DoughnutChartColors } from '@/newapp/shared/constants';

@Component({
  selector: 'prod-collection-chart',
  templateUrl: './prod-collection.component.html',
  styleUrls: ['./prod-collection.component.scss'],
})
export class FinanceProdColComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';
  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingTotalProduction$,
      this.financeFacade.isLoadingCollection$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v, v1]) => v && v1)
    );
  }

  get chartOptions$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => {
        if (typeof v === 'string') {
          return this.labelBarOptionsMultiTC;
        } else {
          return this.labelBarOptionsTC;
        }
      })
    );
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration)
    );
  }

  datasets: ChartDataset[] = [];
  labels = [];

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get totalProdVal$() {
    return this.financeFacade.productionVal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get totalProdTrendVal$() {
    return this.financeFacade.productionTrendVal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get collectionVal$() {
    return this.financeFacade.collectionVal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get collectionTrendVal$() {
    return this.financeFacade.collectionTrendVal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
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

  constructor(
    private financeFacade: FinanceFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {
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

  ngOnInit(): void {}

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

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map(item => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
    // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
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
      legend: this.stackLegendGenerator,
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
