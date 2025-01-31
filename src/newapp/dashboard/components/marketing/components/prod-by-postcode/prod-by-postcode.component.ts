import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartDataset, LegendOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { externalTooltipHandler, formatXTooltipLabel } from '@/newapp/shared/utils';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';

@Component({
  selector: 'mk-prod-by-postcode-chart',
  templateUrl: './prod-by-postcode.component.html',
  styleUrls: [
    './prod-by-postcode.component.scss',
  ],
})
export class MkProdByPostCodeComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  chartNames: MK_PROD_BY_POSTCODE_CHART_NAME[] = [
    'Production By Post Code',
    'Production By Age',
  ];

  datasets: ChartDataset[] = [];
  labels = [];
  showTopValues = false;

  get chartName$() {
    return this.mkFacade.prodByPostCodeChartName$;
  }

  switchChartName(chartName: MK_PROD_BY_POSTCODE_CHART_NAME) {
    this.mkFacade.setProdByPostCodeChartName(chartName);
  }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.chartName$,
      this.mkFacade.isLoadingMkProdByPostCode$,
      this.mkFacade.isLoadingMkProdByPostCodeTrend$,
      this.mkFacade.isLoadingMkProdByAge$,
      this.mkFacade.isLoadingMkProdByAgeTrend$,
    ]).pipe(map(([isTrend, chartName, v, v1, v2, v3]) => {
      if(isTrend) {
        return chartName === 'Production By Post Code'? v1: v3;
      }else{
        return chartName === 'Production By Post Code'? v: v2;
      }
    }));
  }

  get enableIcon$() {
    return combineLatest([
      this.chartName$,
      this.isTrend$
    ]).pipe(map(([chartN, isT]) => {
      return chartN === 'Production By Post Code' && !isT
    }));
  }
  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get hasData() {
    return this.labels.length > 0 && this.datasets?.length > 0;
  }

  get legend$() {
    return combineLatest([this.isTrend$, this.chartName$]).pipe(map(([trend, chartName]) => !trend && chartName === 'Production By Age'));
  }

  get chartType$() {
    return combineLatest([this.isTrend$, this.chartName$]).pipe(map(
      ([trend, chartName]) => !trend && chartName === 'Production By Age'? 'doughnut': 'bar'));
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private mkFacade: MarketingFacade,
    private numPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.chartName$,
      this.isTrend$,
      this.mkFacade.prodByPostCodeChartData$,
      this.mkFacade.prodByPostCodeTrendChartData$,
      this.mkFacade.prodByAgeChartData$,
      this.mkFacade.prodByAgeTrendChartData$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartName, trend, postCodeData, postCodeTrendData, ageData, ageTrendData]) => {
        if(trend) {
          this.datasets = chartName === 'Production By Post Code'? postCodeTrendData.datasets: ageTrendData.datasets;
          this.labels = chartName === 'Production By Post Code'? postCodeTrendData.labels: ageTrendData.labels;
        }else{
          this.datasets = chartName === 'Production By Post Code'? postCodeData.datasets: ageData.datasets;
          this.labels = chartName === 'Production By Post Code'? postCodeData.labels: ageData.labels;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleShowTopValues() {
    this.showTopValues = !this.showTopValues;
  }

  get chartOptions$() {
    return combineLatest([this.isMultipleClinic$, this.isTrend$, this.chartName$]).pipe(
      map(([isMultClinics, isTrend, chartName]) => {
        if (isTrend) {
          return this.stackedChartOptionsRef;
        } else {
          if(chartName === 'Production By Age'){
            return this.pieChartOptions;
          }
          return this.showTopValues
          ? this.prodByPostCodeChartOptions1
          : this.prodByPostCodeChartOptionsDP;
        }
      })
    );
  }

  public prodByPostCodeChartOptionsDP: ChartOptions = {
    indexAxis: 'y', // horizontal bar chart,
    hover: { mode: null },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1,
      easing: 'linear',
    },
    scales: {
      x: {
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.numPipe.transform(label);
            }
            return '';
          },
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number, index) {
            const yLabel = this.getLabelForValue(index);
            if (yLabel.length > 20) {
              return yLabel.slice(0, 20) + '....';
            } else {
              return yLabel;
            }
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        position: 'top',
        onClick: function (e) {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function () {
            return '';
          },
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
        },
      },
    },
  };

  public prodByPostCodeChartOptions1: ChartOptions = {
    ...this.prodByPostCodeChartOptionsDP,
    animation: {
      duration: 1,
      easing: 'linear',
      onComplete: function () {
        var chartInstance = this,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textBaseline = 'bottom';
        // Loop through each data in the datasets
        this.data.datasets.forEach((dataset, i) => {
          var meta = chartInstance.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            let num = dataset.data[index];
            let dataK = shortenLargeNumber(num, 1);
            let dataDisplay = `$${dataK}`;
            ctx.font = 'normal 11px Gilroy-Bold';
            ctx.fillText(dataDisplay, bar.x + 20, bar.y + 5);

            function shortenLargeNumber(num, digits) {
              var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
                decimal;

              for (var i = units.length - 1; i >= 0; i--) {
                decimal = Math.pow(1000, i + 1);

                if (num <= -decimal || num >= decimal) {
                  return +(num / decimal).toFixed(digits) + units[i];
                }
              }

              return num;
            }
          });
        });
      },
    },
  };

  public stackedChartOptionsRef: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
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
          callback: (label: number, index, labels) => {
            return '$' + this.numPipe.transform(label, '');
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        itemSort: (itemA, itemB): number => {
          return itemB.parsed.y - itemA.parsed.y;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0) {
              return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
            } else {
              return '';
            }
          },
          title: tooltipItems => {
            const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: $${this.numPipe.transform(
              sumV
            )}`;
          },
        },
      },
    },
  };

  private legendLabelOptions: _DeepPartialObject<LegendOptions<any>> = {
    labels: {
      usePointStyle: true,
      padding: 20,
    },
    onClick: function (e) {
      e.native.stopPropagation();
    },
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: $${this.numPipe.transform(Math.round(tooltipItem.parsed))}`;
          },
          title: function () {
            return '';
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        ...this.legendLabelOptions,
      },
    },
  };
}
