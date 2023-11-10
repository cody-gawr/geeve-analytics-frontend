import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { externalTooltipHandler } from '@/newapp/shared/utils';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-prod-per-clinic-trend-chart',
  templateUrl: './prod-per-clinic-trend.component.html',
  styleUrls: ['./prod-per-clinic-trend.component.scss'],
})
export class FinanceProdPerClinicTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];

  get isMultiClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerClinicianTrend$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get legend$() {
    return this.dashboardFacade.connectedWith$.pipe(
      takeUntil(this.destroy$),
      map(v => v && v != 'none')
    );
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private dashboardFacade: DashboardFacade
  ) {
    combineLatest([this.financeFacade.prodByClinicianTrendChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = chartData.datasets;
        this.labels = chartData.labels;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

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

  public labelBarPercentOptionsStacked: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
        max: 100,
        min: 0,
        ticks: {
          callback: function (item) {
            return item + '%';
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: 'x',
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            const yValue = Math.round(tooltipItems.parsed.y);
            if (yValue > 0) {
              return `${tooltipItems.dataset.label}: ${yValue}%`;
            } else {
              return '';
            }
          },
          title: tooltipItems => tooltipItems[0].label,
        },
      },
    },
  };
}
