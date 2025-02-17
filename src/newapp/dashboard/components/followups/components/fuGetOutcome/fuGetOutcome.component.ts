import { FollowupsFacade } from '@/newapp/dashboard/facades/followups.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fuGetOutcome',
  templateUrl: './fuGetOutcome.component.html',
  styleUrls: ['./fuGetOutcome.component.scss'],
})
export class FuGetOutcomeComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  chartNames: FU_OUTCOME_CHART_NAME[] = ['Ticks', 'Recalls', 'FTAs', 'UTAs'];

  results = [];
  total = 0;
  prev = 0;

  get isLoading$() {
    return;
  }

  get chartName$() {
    return this.fuFacade.fuGetOutcomeChartName$;
  }

  pieTooltipText({ data, index }) {
    const labl = data.name.split('--');
    const label = labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
    const val = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}%</span>
    `;
  }

  pieLabelText(labels) {
    const labl = labels.split('--');
    return labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
  }

  public colorScheme = {
    domain: [
      '#6edbba',
      '#abb3ff',
      '#b0fffa',
      '#ffb4b5',
      '#d7f8ef',
      '#fffdac',
      '#fef0b8',
      '#4ccfae',
    ],
  };

  constructor(private fuFacade: FollowupsFacade) {}

  ngOnInit(): void {
    combineLatest([
      this.fuFacade.fuGetOutcomeChartData$,
      this.fuFacade.fuGetOutcomeChartName$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, chartName]) => {
        switch (chartName) {
          case 'Ticks':
            this.results = chartData.ticks;
            break;
          case 'Recalls':
            this.results = chartData.recalls;
            break;
          case 'FTAs':
            this.results = chartData.ftas;
            break;
          case 'UTAs':
            this.results = chartData.utas;
        }
        this.total = chartData.total;
        this.prev = chartData.prev;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    this.fuFacade.setFuOutComeChartName(chartName);
  }

  get noDataMessage$() {
    return this.fuFacade.fuGetOutcomeChartName$.pipe(
      map(chartName => {
        switch (chartName) {
          case 'Ticks':
            return 'No TICK followups were completed in this period';
          case 'Recalls':
            return 'No Recall followups were completed in this period';
          case 'FTAs':
            return 'No FTA followups were completed in this period';
          case 'UTAs':
            return 'No UTA followups were completed in this period';
        }
      })
    );
  }

  get hasData() {
    return this.results.length > 0;
  }
}
