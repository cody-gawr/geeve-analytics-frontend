import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DecimalPipe } from '@angular/common';
import { ChartTip } from '@/newapp/models/dashboard/finance';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY', // Input parsing format
  },
  display: {
    dateInput: 'MMM YYYY', // Display format in the input
    monthYearLabel: 'MMM YYYY', // Format for the calendar header
    dateA11yLabel: 'LL', // Accessibility label
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility for calendar header
  },
};

@Component({
  selector: 'app-chart',
  templateUrl: './app-chart.component.html',
  styleUrls: ['./app-chart.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AppChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() toolTip: ChartTip = null;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  @Input() chartTitle: string = '';
  @Input() chartType: ChartType | 'arch' = 'bar';
  @Input() chartOptions: ChartOptions = null;
  @Input() enableLegend: boolean = false;
  @Input() datasets: ChartDataset<any> = [{ data: [] }];
  @Input() labels: string[] = [];
  @Input() hasData: boolean = false;
  @Input() noDataAlertMessage: string = 'No data found!';
  @Input() newLogo = false;
  // Gauge Type
  @Input() gaugeValue = 0;
  @Input() gaugeLabel = '';
  @Input() gaugeSize = 300;
  @Input() isLoading: boolean = false;
  @Input() gaugeMax = 100;
  @Input() gaugeDur = 2500;

  @Input() trendTipIcon: string = '';
  @Input() trendTipIconColor: string = 'primary';
  @Input() trendTipText: string = '';

  @Input() chartTabs: string[] = [];
  @Input() activeTab: string = null;
  @Input() switchActiveTab: CallableFunction;

  @Input() goal: number = 0;
  @Input() enableGoal: boolean = false;
  @Input() goalCount: number = 0;

  @Input() prev: number = 0;
  @Input() curr: number = 0;
  @Input() duration: DATE_RANGE_DURATION = null;
  @Input() durationCurrLabel: string = '';
  @Input() durationPrevLabel: string = '';

  @Input() enablePaTableView: boolean = false;
  @Input() paTableData: Record<string, any>[] = [];
  tableHeaders: string[] = [];
  @Input() maxBarsAlertMsg: string = '';
  @Input() datePicker: FormControl<Moment>;
  @Input() currency = '%';
  @Input() appendCurrency = true;
  @Input() chartBoxHeight = '350px';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  showPaTableView = false;

  get readyToDrawChart() {
    return this.hasData && this.chartType && this.chartOptions;
  }

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paTableData'] && this.paTableData?.length) {
      this.tableHeaders = Object.keys(this.paTableData[0]);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleShowOfPaTableView() {
    this.showPaTableView = !this.showPaTableView;
  }

  formatValue(value: any) {
    value = this.decimalPipe.transform(value);
    if (this.appendCurrency) {
      return `${value}${this.currency}`;
    } else {
      return `${this.currency}${value}`;
    }
  }

  get showMaxBarsAlert() {
    return (
      !this.showPaTableView &&
      this.paTableData?.length > this.labels?.length &&
      this.enablePaTableView
    );
  }
}
