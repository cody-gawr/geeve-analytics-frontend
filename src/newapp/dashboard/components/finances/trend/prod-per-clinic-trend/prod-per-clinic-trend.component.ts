import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  externalTooltipHandler,
  generatingLegend_4,
} from '@/newapp/shared/utils';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-prod-per-clinic-trend-chart',
  templateUrl: './prod-per-clinic-trend.component.html',
  styleUrls: ['./prod-per-clinic-trend.component.scss'],
})
export class FinanceProdPerClinicTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];

  get isMultiClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerClinicianTrend$;
  }

  get legend$() {
    return this.clinicFacade.connectedWith$.pipe(map(v => v && v != 'none'));
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
  ) {}

  ngOnInit(): void {
    combineLatest([this.financeFacade.prodByClinicianTrendChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = chartData.datasets;
        this.labels = chartData.labels;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

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
      // colors: { enabled: true },
      legend: generatingLegend_4(),
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
